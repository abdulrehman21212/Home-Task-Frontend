import { combineReducers } from "redux";
const articles = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_ARTICLES":
        return payload;
        default:
          return state;
      }
  };
 
  export const articlesReducer = combineReducers({
    articles,
  });