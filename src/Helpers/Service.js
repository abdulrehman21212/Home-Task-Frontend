import api from "./ApiRespository"
export const loginCall = (data) => {
    return api.post('/login', data);
}

export const registerCall = (data) => {
    return api.post('/register', data);
}
export const getAllArticlesCall = (data) => {
    return api.post('/get/articles', data);
}
export const getPersonalizedNewsFeedCall = (data) => {
    return api.post('/user/articles', data);
}


export const getAuthorsCall = () => {
    return api.get('/get/authors');
}

export const getCategoriesCall = () => {
    return api.get('/get/categories');
}

export const getSourcesCall = () => {
    return api.get('/get/sources');
}

export const handleSubmitPreferencesCall = (data) => {
    return api.post('/user/settings',data);
}

export const filterArticlesCall = (data) => {
    return api.post('/articles/filter',data);
}