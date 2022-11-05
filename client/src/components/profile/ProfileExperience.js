import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => (
  <div class="prof-box-container">
  
  <div class="prof-box">
      <i class="fas fa-solid fa-briefcase"></i>
      <span><Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}</span>
      <h3>{company}</h3>
      <p>Position: {title}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
  </div>
  
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;