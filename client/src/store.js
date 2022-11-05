import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';  //index.js

const middleware = [thunk];

const user=localStorage.getItem("user")?localStorage.getItem("user"):null;
console.log(user)
const token=localStorage.getItem("token")?localStorage.getItem("token"):null;
const auth={user,token}
const initialState = {
  auth,user
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store