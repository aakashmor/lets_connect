import { Fragment,useEffect,useContext } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'

import './App.css';
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layouts/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/privateRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddEducation from './components/profile-forms/AddEducation'
import AddExperience from './components/profile-forms/AddExperience'
import Profiles from './components/Profiles/Profiles'
import Profile from './components/profile/Profile'
import Messenger from './pages/messenger/Messenger'

import store from './store'

import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'

if(localStorage.token){
  setAuthToken(localStorage.token)  //to make token header as default while sending request
}

const App=()=>{
useEffect(()=>{
        store.dispatch(loadUser())  //will only run once, will load user if logged in  
},[])
    return ( 
                          <Provider store={store}>
    <BrowserRouter>
      <Fragment>
           <Navbar/>
           
           <section className='containerr'>
             <Alert/>
             <div className="prof">
          <Route exact path='/profile/:id' component={Profile} />
            </div>
              <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/profiles' component={Profiles} />
              <PrivateRoute exact path="/messenger" component={Messenger}/>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
              <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              </Switch>
           </section>
           
      </Fragment>
    </BrowserRouter>
                           </Provider>
  );
     }

export default App;
