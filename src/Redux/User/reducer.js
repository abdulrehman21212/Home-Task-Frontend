import { combineReducers } from "redux";
const index = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_USER":
        return payload;
     case "REMOVE_USER":
        return payload;
      
        default:
          return state;
      }
  };
  const token = (state = null, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_TOKEN":
        return payload;
      case "REMOVE_TOKEN":
        return payload;

      default:
        return state;
    }
  };
  export const userReducer = combineReducers({
    index,
    token,
  });