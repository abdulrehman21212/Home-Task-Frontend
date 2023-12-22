import React, { useEffect, useState } from 'react'
import AppLayout from '../Components/Layouts/AppLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticlesCall, getPersonalizedNewsFeedCall } from '../Helpers/Service';
import { setArticles } from '../Redux/Articles/actions';


export const Home = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.index);
  const token = useSelector((state) => state?.user?.token);
  const articlesData = useSelector((state) => state?.articles?.articles?.data);
  const totalCount = useSelector((state) => state?.articles?.articles?.total);
  const limit = 10; 
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalCount / limit);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);






const [loader,setLoader] = useState(false);
  

 
  const getPersonlizedNews = async () =>{
   
    try {
      setLoader(true)
      const response = await getPersonalizedNewsFeedCall({page:currentPage??0});
      dispatch(setArticles(response.data.data))
    } catch (error) {
    }finally{
      setLoader(false)

    }
  }

  const getArticles = async () =>{
    try {
      setLoader(true)

      const response = await getAllArticlesCall({page:currentPage??0});
      dispatch(setArticles(response.data.data))
    } catch (error) {
    }finally{
      setLoader(false)
    }
  }

useEffect(()=>{
  if(user){
    getPersonlizedNews()
  }else{
    getArticles()
  }
},[user, currentPage])





  return (
    <AppLayout>
      {loader?
     <>
     <div className='d-flex justify-content-center'>
        <img src='https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif' alt='loading'
        
        />
     </div>
   </>
    :
      <main>
        {/* Trending Area Start */}
        <div className="trending-area fix">
          <div className="container">
            <div className="trending-main">
              {/* Trending Tittle */}

              <div className="row">
                <div className="col-lg-12">
                  {/* Trending Top */}
                  {articlesData?.length > 0?
                   <div className="trending-top mb-30">
                    <a href={articlesData[0]?.url}
                    target='_blank'>

                   <div className="trend-top-img" >
                     <img src={`${articlesData[0]?.image_url??'https://localfoodconnect.org.au/wp-content/plugins/responsive-menu/v4.0.0/assets/images/no-preview.jpeg'}`} alt="" />
                     <div className="trend-top-cap">
                       <span>{articlesData[0]?.section??''}</span>
                       <h2 className='text-light'>{articlesData[0]?.title??''}</h2>
                     </div>
                   </div>
                    </a>
                 </div>:
                 <div className='d-flex justify-content-center mt-5'>
                  <h3>No Result Found</h3>
                 </div>
                }
                 
                  {/* Trending Bottom */}
                  <div className="trending-bottom">
                    <div className="row">
                      {articlesData?.map((sn)=>{
                        return <>
                         <div className="col-lg-4">
                          <a href={sn?.url} target='_blank'>
                        <div className="single-bottom mb-35">
                          <div className="trend-bottom-img mb-30">
                            <img src={`${sn?.image_url??'https://localfoodconnect.org.au/wp-content/plugins/responsive-menu/v4.0.0/assets/images/no-preview.jpeg'}`} alt="" />
                          </div>
                          <div className="trend-bottom-cap">
                            <span className="color1">{sn?.section??''}</span>
                            <h4><a href="details.html">{sn.title??''}</a></h4>
                          </div>
                        </div>

                          </a>
                      </div>
                        </>
                      })}
                   
                    </div>
                  </div>
                </div>
                {/* Riht content */}

              </div>
            </div>
          </div>
        </div>
        {/* Trending Area End */}
        {/*   Weekly-News start */}
        <div className="weekly-news-area pt-50">
          <div className="container">
            <div className="weekly-wrapper">
              {/* section Tittle */}


            </div>
          </div>
        </div>
        {/* End Weekly-News */}
        {/* Whats New Start */}
     
        {/* Whats New End */}
        {/*   Weekly2-News start */}
        <div className="weekly2-news-area  weekly2-pading gray-bg">
          <div className="container">
            <div className="weekly2-wrapper">
              {/* section Tittle */}

            </div>
          </div>
        </div>
        {/* End Weekly-News */}
        {/* Start Youtube */}

        {/* End Start youtube */}
        {/*  Recent Articles start */}

        {/*Recent Articles End */}
        {/*Start pagination */}
        <div className="pagination-area pb-45 text-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-start">
          <li className="page-item">
            <button
            disabled={currentPage <= 0 ?true:false}
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              // disabled={currentPage === 1}
            >
              <span className="flaticon-arrow roted" />
            </button>
          </li>
          {pageNumbers?.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage + 1 ? 'active' : ''}`}
            >
              <a
                className="page-link"
                onClick={() => handlePageChange(pageNumber -1)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages -1?true:false}
            >
              <span className="flaticon-arrow right-arrow" />
            </button>
          </li>
        </ul>
      </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End pagination  */}
      </main>
    }

    </AppLayout>
  )
}
