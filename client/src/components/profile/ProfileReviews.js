import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ReviewItem from '../reviews/ReviewItem.js';
import ReviewForm from '../reviews/ReviewForm.js';
const ProfileReviews = ({
  auth,
    id, 
    profile:{
       reviews
    }
 }) => {

  return  (
    <Fragment>
      <h1 className='large'style={{color:'white'}}>Reviews</h1> <br></br>
      {auth&&auth.user?<ReviewForm _id={id} />:<>Login to add reviews<br></br></>}
      
      <br></br>
      <div className='posts'>
        {reviews.length>0?(reviews.map(review => (
          <ReviewItem key={review._id} review={review} />
        ))):(
            <>
            <h3>No reviews yet</h3>
            </>
        )}
      </div>
    </Fragment>
  );
};

export default ProfileReviews;