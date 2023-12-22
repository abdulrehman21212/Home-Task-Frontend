import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { showErrors } from '../../Helpers/Index';
import { APP_URL } from '../../Helpers/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, removeUser, setTokenAction, setUserAction } from '../../Redux/User/actions';
import { filterArticlesCall, getAuthorsCall, getCategoriesCall, getSourcesCall, handleSubmitPreferencesCall, loginCall, registerCall } from '../../Helpers/Service';
import Select from 'react-select';
import { setAuthors, setCategories, setSources } from '../../Redux/Preferences/actions';
import debounce from 'lodash.debounce';
import { setArticles } from '../../Redux/Articles/actions';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


export const Header = () => {



  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState([]);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);


  const user = useSelector((state) => state?.user?.index);
  const authors = useSelector((state) => state?.prefernces?.authors);
  const categories = useSelector((state) => state?.prefernces?.categories);
  const sources = useSelector((state) => state?.prefernces?.sources);

  const [searchTerm, setSearchTerm] = useState('');

  const [searchFilterKeyword, setSearchFilterKeyword] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');



  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  

  const notify = (message) => toast(message);


  useEffect(()=>{
    if(user){
      getAuthors()
      getCategories()
      getSources()
      setSelectedCategories(user?.preference?.categories)
      setSelectedAuthors(user?.preference?.authors)
      setSelectedSources(user?.preference?.sources)
    }
  },[user])


  const colourOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  const getAuthors = async () => {
    try {
      const response = await getAuthorsCall();
      dispatch(setAuthors(response.data.data))
    } catch (error) {
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategoriesCall();
      dispatch(setCategories(response.data.data))

    } catch (error) {

    }

  };
  const getSources = async () => {
    try {
      const response = await getSourcesCall();
      dispatch(setSources(response.data.data))
    } catch (error) {

    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('state')

    dispatch(removeUser(null))
    dispatch(removeToken(null))



  }


  const handleLoginSubmit = async (e) => {

    try {
      const response = await loginCall(loginData);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUserAction(user));
      dispatch(setTokenAction(token));
      window.$('#exampleModal').modal('hide');
      notify(response.data.message)

    } catch (error) {
      setErrors(error.response.data.errors || error.response.data)

    }
  };

  const handleSignupSubmit = async (e) => {

    try {
      const response = await registerCall(signupData);
      dispatch(setUserAction(response.data.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setTokenAction(response.data.token));
      window.$('#exampleModal').modal('hide');
      notify(response.data.message)

    } catch (error) {
      setErrors(error.response.data.errors)

      console.log(error);
    }
  };


  const handleAuthorChange = (selectedOption) => {
    let selectedAutorArray = selectedOption.map((option)=>{
      return option?.value;
    })
    setSelectedAuthors(selectedAutorArray)
  };
  const handleCategoryChange = (selectedOption) => {
    let selectedCategoryArray = selectedOption.map((option)=>{
      return option?.value;
    })
    setSelectedCategories(selectedCategoryArray)

  };
  const handleSourceChange = (selectedOption) => {
    let selectedSourceArray = selectedOption.map((option)=>{
      return option?.value;
    })
    setSelectedSources(selectedSourceArray)
  };

  const handleSubmitPreferences = async () =>{
    let data = {}
    data.authors = selectedAuthors
    data.categories = selectedCategories
    data.sources = selectedSources
   try{
     const response = await handleSubmitPreferencesCall(data) 
     dispatch(setUserAction(response.data.data));
     window.$('#settingsModal').modal('hide');
     notify(response.data.message)
    }catch(error){
   }
  }

  //filters



  useEffect(()=>{
    if(searchFilterKeyword||sourceFilter||categoryFilter||startDate||endDate)
    getFilterData()
  },[searchFilterKeyword, sourceFilter,categoryFilter, startDate, endDate])


  const getFilterData = async()=> {
    let data = {}
    data.keyword = searchFilterKeyword
    data.source = sourceFilter
    data.category = categoryFilter
    data.start_date = startDate
    data.end_date = endDate

    try{
      const response = await filterArticlesCall(data)
      dispatch(setArticles(response.data.data))
    }catch(error){

    }
  }
  
  const handleSearch = debounce((searchQuery) => {
    setSearchFilterKeyword(searchQuery)
  }, 500); 

  const onSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleSourceFilterChange = (e)=>{
    setSourceFilter(e.target.value)
  }

  const handleCategoryFilterChange = (e)=>{
    setCategoryFilter(e.target.value)
  }

  

  const handleStartDateChange = (event) => {
    const newStartDate = new Date(event.target.value);

    setStartDate(newStartDate);

    if (newStartDate > endDate) {
      setEndDate(newStartDate.setDate(newStartDate.getDate() + 1));
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = new Date(event.target.value);

    if (newEndDate > startDate) {
      setEndDate(newEndDate);
    }
  };

  return (
    <header>
      <ToastContainer />
      {/* Header Start */}
      <div className="header-area">
        <div className="main-header ">

        
          <div className="header-bottom header-sticky pt-3">
            <div className="container">
              <div className='row'>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 header-flex">
                  <div className=" p-2">
                    <a href="/"><img src="assets/img/logo/logo.png" alt="" width={150} /></a>
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end'>

                <div>
                      {user ? (
                        // If user data is present, don't render the buttons

                        <div>


                          <div className="dropdown">
                            <span
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                              </svg>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                              <a className="dropdown-item"
                                type="button"
                                data-toggle="modal"
                                data-target="#settingsModal"
                              >
                                settings
                              </a>
                              <a className="dropdown-item" onClick={handleLogout}>
                                logout
                              </a>
                            </div>
                          </div>



                          <b className='p-3'>{user?.name}</b>
                        </div>
                      ) : (
                        // Render the buttons if there's no user data
                        <div className='d-flex'>
                          <button
                            type="button"
                            className="btn btn-dark mr-2"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          onClick={()=>setActiveTab('login')}
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={()=> setActiveTab('signup')}
                          
                          >
                            Signup
                          </button>
                        </div>
                      )}
                    </div>
                </div>
              </div>
            <div className="row mt-3">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex mt-1">
                      <select class="form-control mr-2 "
                        onChange={handleSourceFilterChange}
                        >
                        <option>
                        select source</option>
                        {sources?.map((source)=>{
                          return <>
                          <option 
                          value={source}
                          >
                            {source}
                          </option>
                          </>
                        })}
                        
                      </select>

                      <select class="form-control"
                      onChange={handleCategoryFilterChange}
                      >
                        <option>
                        select category</option>
                        {categories?.map((category)=>{
                          return <>
                          <option >
                            {category}
                          </option>
                          </>
                        })}
                      </select>
                </div>
                <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mt-1">

                      <div className="input-group input-daterange">
                    <input
                      type="date"
                      className="start-date form-control"
                      value={moment(startDate).format("YYYY-MM-DD")}
                      onChange={handleStartDateChange}
                    />
                    <span className="input-group-addon"></span>
                    <input
                      type="date"
                      className="end-date form-control"
                      value={moment(endDate).format("YYYY-MM-DD")}
                      onChange={handleEndDateChange}
                      min={moment(startDate).format("YYYY-MM-DD")}
                    />

                    </div>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-1">
                      <div className="form-group d-flex ">
                        <input
                          type="text"
                          className="form-control w-100"
                            value={searchTerm}
                            onChange={onSearchChange}
                            placeholder="Search" 
                        />
                        <div className="d-flex justify-content-center align-items-center p-2">
                          <i className="fas fa-search special-tag" />
                        </div>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className='row'>
                <div className='col-6'>
                  <h3 className={` ${activeTab === 'login' ? 'btn btn-secondary p-4' : ' p-2'}`} onClick={() => handleTabChange('login')}>Login Tab</h3>

                </div>
                <div className='col-6'>
                  <h3 className={` ${activeTab === 'signup' ? 'btn btn-secondary p-4' : ' p-2'}`} onClick={() => handleTabChange('signup')}>Signup Tab</h3>

                </div>

              </div>
              <div>
              </div>
              {activeTab === 'login' ? (
                <form>
                  <div className='form-group'>

                    <label for="exampleInputEmail1" className='w-100'>
                      Email
                      <input
                       onFocus={()=> setErrors([])} 
                        placeholder="Email"
                        id="exampleInputEmail1"
                        className='form-control'
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </label>
                    <div className='text-danger'>
                      {showErrors(errors, 'email')}
                    </div>
                  </div>
                  <div className='form-group'>

                    <label for="exampleInputPassword1" className='w-100'>
                      Password
                      <input
                       onFocus={()=> setErrors([])} 
                        className='form-control'
                        id="exampleInputPassword1"
                        placeholder="Password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </label>
                    <div className='text-danger'>
                      {showErrors(errors, 'password')}
                      {showErrors(errors, 'error')}
                    </div>
                  </div>
                </form>
              ) : (
                <form>
                  <div className='form-group'>

                    <label className='w-100'>
                      Username
                      <input
                       onFocus={()=> setErrors([])} 
                        placeholder='Username'
                        className='form-control'
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      />
                    </label>
                    <div className='text-danger'>
                      {showErrors(errors, 'name')}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='w-100'>
                      Email
                      <input
                       onFocus={()=> setErrors([])} 
                        placeholder='Email'
                        className='form-control'
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </label>
                    <div className='text-danger'>
                      {showErrors(errors, 'email')}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='w-100'>
                      Password
                      <input
                       onFocus={()=> setErrors([])} 
                        placeholder='Password'
                        className='form-control'
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                    </label>
                    <div className='text-danger'>
                      {showErrors(errors, 'password')}
                    </div>
                  </div>



                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {activeTab === 'login' ?
                <button type="button" className="btn btn-secondary" onClick={() => handleLoginSubmit()}>Login</button>
                :
                <button type="button" className="btn btn-secondary" onClick={() => handleSignupSubmit()}>Signup</button>

              }
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>


      {/* Modal */}
      <div
        className="modal fade"
        id="settingsModal"
        tabIndex={-1}
        aria-labelledby="settingsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsModalLabel">
                Settings
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body py-5">
              <label>Authors</label>
              <Select
                value={selectedAuthors?.map((author)=>{
                  return {value:author, label:author}
                })}
                isMulti
                name="colors"
                options={authors?.map ((author) => {
                  return {
                    value: author,
                    label: author
                  }
                })  }
                onChange={handleAuthorChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />

              <label>Categories</label>
              <Select
                value={selectedCategories?.map((category)=>{
                  return {value:category, label:category}
                })}
                isMulti
                name="colors"
                options={categories?.map ((category) => {
                  return {
                    value: category,
                    label: category
                  }
                })  }
                onChange={handleCategoryChange}

                className="basic-multi-select"
                classNamePrefix="select"
              />

              <label>Sources</label>
              <Select
                value={selectedSources?.map((source)=>{
                  return {value:source, label:source}
                })}
                isMulti
                name="colors"
                options={sources ?. map ((source) => {
                  return {
                    value: source,
                    label: source
                  }
                })  }
                onChange={handleSourceChange}

                className="basic-multi-select"
                classNamePrefix="select"
              />

            </div>
            <div className="modal-footer mt-5">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitPreferences}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>


  )
}
