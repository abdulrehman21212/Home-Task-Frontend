import { combineReducers } from "redux";
const authors = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_AUTHORS":
        return payload;
        default:
          return state;
      }
  };
  const categories = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
     case "SET_CATEGORIES":
        return payload;
        default:
          return state;
      }
  };
  const sources = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
     case "SET_SOURCES":
        return payload;
        default:
          return state;
      }
  };
  export const preferencesReducer = combineReducers({
    authors,categories,sources
  });