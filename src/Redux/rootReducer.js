import { combineReducers } from 'redux';
import { userReducer } from "./User/reducer";
import { preferencesReducer } from './Preferences/reducer';
import { articlesReducer } from './Articles/reducer';
export const rootReducer = combineReducers({
    user:userReducer,
    prefernces:preferencesReducer,
    articles:articlesReducer
  });
export default rootReducer;