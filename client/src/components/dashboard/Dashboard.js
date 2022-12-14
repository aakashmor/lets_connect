import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layouts/Spinner'
import { getCurrentProfile} from '../../actions/profile';
const Dashboard=({history, getCurrentProfile,deleteAccount, auth: { user }, profile: { profile,loading}})=>{
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading&&profile===null?<Spinner/>:<Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
           <DashboardActions />
         <Education education={profile.education} />
        <Experience experience={profile.experience} />
        
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });

export default connect(
    mapStateToProps,
    { getCurrentProfile}
  )(Dashboard);