import React, {useState, Fragment } from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import setAlert from '../../actions/alert'
import {registerUser} from '../../actions/auth'
import propTypes from 'prop-types'
import {Form} from 'react-bootstrap'
import Spinner from '../layouts/Spinner.js'
import axios from 'axios'


const Register=(props)=>{
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  let [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

      const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          const { data } = await axios.post('api/upload', formData, config)
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
    }

      const onSubmit = async (e) => {
        e.preventDefault();
        if(image===''){
        image=`https://avatars.dicebear.com/api/identicon/${email}.svg`
        }
        console.log(image)
        if (password !== password2) {
          props.setAlert('Passwords do not match','danger')
        } else {        
              props.registerUser(name,email,password,image)
              console.log('success')
        }
      }
       
      if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }
       

    return (
        <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
      <br></br>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            
            value={password2} onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {process.env.NODE_ENV==='production'?<></>: <><Form.Group controlId='image'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Group controlId="formFile" className="mb-3">
             <Form.Control type="file"  onChange={uploadFileHandler}/>
              </Form.Group>
              {uploading && <Spinner />}
            </Form.Group></>}
       
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <br></br>
      <p className="my-1">
        Already Registered? <Link to='/login'>Log In</Link>
      </p>
    </Fragment>
    )
}

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  registerUser: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,registerUser})(Register)