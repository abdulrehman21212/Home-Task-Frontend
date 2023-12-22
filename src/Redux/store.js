import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
function saveToLocalStorage(state) {
    try {
        const serializationState = JSON.stringify(state);
        localStorage.setItem("state", serializationState);
    } catch (error) {
        console.log(error);
    }
}
function loadFromLocalStorage() {
    try {
        const serializationState = localStorage.getItem("state");
        if (serializationState === null) return undefined;
        return JSON.parse(serializationState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage()
  });
  store.subscribe(() => {
    saveToLocalStorage(store.getState());
  });
  export default store;