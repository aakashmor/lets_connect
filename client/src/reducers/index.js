import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
import profileReducer from './profile'
import chatReducer from './chat'
import userReducer from './user'
export default combineReducers({
     alert,
     auth,
     profile:profileReducer,
     currChat:chatReducer
})
