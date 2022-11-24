import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import setAlert from '../../actions/alert.js'
import {updateChat} from '../../actions/chat.js'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import pfp from '../../img/default_pfp.jpg'
//import { addLike, } from '../../actions/profile';
const ProfileTop = ({
  auth,
  profile: {
    status,
    company,
    location,
    website,
    social,
    likes,
    bio,skills,
    user: { name, avatar }
  },_id,
  setAlert,
  updateChat
}) => {
  const history = useHistory();
  const [img,setImg]=useState(pfp)
   
   useEffect(()=>{
           if(avatar!=="") setImg(avatar)
   },[img,avatar])

   const addLike=async ()=>{
    try {
      const res = await axios.post(`/api/profile/likes/${_id}`);
      if(res.data.msg){
        setAlert('Profile already Liked','danger');
        return;
      }
      else
      window.location.reload()
    } catch (error) {
      console.log(error.msg)
           setAlert('Please Login to like','danger');
    }
   }
   
   const removeLike=async ()=>{
    try {
      const res = await axios.post(`/api/profile/unlike/${_id}`);
      if(res.data.msg){
        setAlert('Profile not liked','danger');
        return;
      }
      else
      window.location.reload()
    } catch (error) {
      console.log(error.msg)
           setAlert('Please Login to unlike','danger');
    }
   }

  const postConvo=async ()=>{
    try{
      const config={
        headers:{
           'Content-Type':'application/json'
            }
       }
       const body={
         senderId:auth.user._id,
         receiverId:_id
       }
      const res=await axios.post('/conversations',body,config)
       updateChat(res.data._id)
       history.push(`/messenger`)
    }
    catch(e){
      console.log(e);
    }

  }

  const addFollow=async ()=>{
        try{
           const res = await axios.put(`/api/users/${_id}/follow`); 
            postConvo()
        }catch(error){
          console.log(error);
        }
  }

  return (
    <section class="prof-home" id="home">
    <div class="prof-user">
      <div class="img-prof"><img src={img} alt=""></img></div>
      <h3 class="prof-name">{status}-  {company &&  <span> at {company}</span>}</h3>
      <p class="prof-post">{location && <span>{location}</span>}</p>
      {
          <>
          <div className="like-unlike-div">
          <button
               onClick={() => addLike()}
            type='button'
            className='btn btn-light like-unlike'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes&&likes.length >= 0 && <p style={{color:'black'}}>{likes.length}</p>}</span>
          </button>
          <button
            onClick={() => removeLike()}
            type='button'
            className='btn btn-light like-unlike'
          >
            <i className='fas fa-thumbs-down'  />
          </button>
          </div>            
          </>
      }
  </div>
  <h3>HI THERE !</h3>
  <h1>I'M <span className="typed-name">{name}</span></h1>
  <p>Bio: {bio}
  </p>
  <p>{skills.map((skill, index) => (
          <i className='fas fa-check'> {skill}</i>
      ))} </p>
      {auth!==null&&auth.user!==null&&auth.user._id!==_id? <button className="btn"  onClick={()=>addFollow()}>Message <i className="fas fa-user"></i></button>:<></>}
  <div className='icons my-1 icons-top' >
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x' />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
  </section>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setAlert,updateChat }
)(ProfileTop);
