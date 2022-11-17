import React,{Fragment,useRef,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { io } from "socket.io-client";
const Navbar=({ auth: { isAuthenticated, loading }, logout })=>{
  const socket = useRef();
  const [notif,setNotif]=useState('white')
  useEffect(() => {
    socket.current = io("http://localhost:5000/");
    socket.current.on("getMessage", (data) => {
      console.log("message recieved")
      setNotif('red');
    });
  }, []);

  const authLinks = (
     <ul>  
       <li >
         <Link to ='/messenger'style={{color:notif}}>Messages</Link>
       </li>
        <li>
        <Link to='/profiles'>Leaderboard</Link>
      </li>
       <li>
        <Link to='/dashboard'> <span className='hide-sm'>Dashboard</span></Link>
      </li>
      <li> 
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Leaderboard</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
    return (
        <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'><i className='fas fa-broadcast-tower'></i> Lets Connect</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>          
    )

}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);