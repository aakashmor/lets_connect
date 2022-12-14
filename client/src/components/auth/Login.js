import React, {useState, Fragment } from 'react'
import {Link,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login=(props)=>{

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      const {email, password } = formData;

      const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

      const onSubmit = async (e) => {
        e.preventDefault();
          props.login(email,password)
      }

      if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }
       
    return (
        <Fragment>
        <h1 className="large text-primary">Log In</h1>
      <br></br>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <br></br>
      <p className="my-1">
        Not registered? <Link to='/register'>Create Account</Link>
      </p>
    </Fragment>
    )
}

Login.propTypes={
  login:propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login)