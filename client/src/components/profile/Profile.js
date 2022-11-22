import React, { Fragment, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import ProfileLeetcode from './ProfileLeetcode';
import ProfileReviews from './ProfileReviews'
import { getProfileById } from '../../actions/profile';
import Typed from 'typed.js';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
       <>   
  
<div id="prof-menu" class="fas fa-bars"></div>

<ProfileTop profile={profile} _id={match.params.id}/>

<section class="prof-education" id="education">

  <h1 class="prof-heading"> my <span>education</span> </h1>
  {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4 style={{color:'white'}}>No education credentials</h4>
              )}
  
  <h1 class="prof-heading"> my <span>Experience</span> </h1>
  {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4 style={{color:'white'}}>No experience credentials</h4>
              )}
  
  </section>

<section class="prof-portfolio" id="portfolio">

<h1 class="prof-heading"> My <span>Profiles</span> </h1>
             {profile.githubusername? (
              <ProfileGithub username={profile.githubusername} />
            ):<>Github username not provided<br></br></>}
            {profile.leetcodeusername ? (
              <ProfileLeetcode username={profile.leetcodeusername} />
            ):<>Leetcode username not provided<br></br></>}  
</section>

<section class="contact" id="contact">
  
<ProfileReviews id={match.params.id} profile={profile} auth={auth}/>
</section>

</>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);


/*
      <header>

<div class="prof-user">
    <img src="images/pic.jpg" alt=""></img>
    <h3 class="prof-name">Harshdeep Dhiman</h3>
    <p class="prof-post">Student or Learning at Chitkara University</p>
</div>

<nav class="prof-navbar">
    <ul>
        <li><a href="#home">home</a></li>
        <li><a href="#education">History</a></li>
        <li><a href="#portfolio">Profiles</a></li>
        <li><a href="#contact">Reviews</a></li>
    </ul>
</nav>

</header>
*/ 

/*
<div className='profile-grid my-1'>
            <ProfileTop profile={profile} _id={match.params.id} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
            {profile.leetcodeusername && (
              <ProfileLeetcode username={profile.leetcodeusername} />
            )} 
             {profile.codeforcesusername && (
              <ProfileCodeforces username={profile.codeforcesusername} />
            )} 
            <ProfileReviews id={match.params.id} profile={profile}/>
          </div>
*/ 