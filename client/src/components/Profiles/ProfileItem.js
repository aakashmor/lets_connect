import React,{useRef} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card,Button,ListGroup,Dropdown} from 'react-bootstrap'
import pfp from '../../img/default_pfp.jpg'
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    likes
  }
}) => {
  const imgRef = useRef();
  const onImageError = () => imgRef.current.src=pfp;
  return (
    <>
    <Card  className="card" style={{ width: '14.5rem',display:'inline-grid'}}>
    <Card.Img variant="top" src={avatar}  className="cardImg" alt={pfp}  onError={onImageError} ref={imgRef}/>
    <Card.Body>
      <Card.Title>{name}  <i className='fas fa-heart'></i>: {likes.length}</Card.Title>
      <Card.Text>
      {status} {company && <span> at {company}</span>}
      </Card.Text>
      <ListGroup className="list-group-flush">
     
      <ListGroup.Item ><Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm">
        Skills
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {skills.slice(0, 4).map((skill, index) => (
           <Dropdown.Item href="#/action-1">
             <i className='fas fa-check' /> {skill}
           </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown></ListGroup.Item>
      </ListGroup>
      <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
    </Card.Body>
  </Card>
  </>  
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;