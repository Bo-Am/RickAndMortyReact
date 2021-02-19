import React from 'react';
// import './Card.css';

const Card = ({
  id,
  imgSrc,
  imgAlt,
  name,
  species,
  gender,
  status,
  location
}) => {
  return (
    <div className='card'>
      <div>
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div>
        <h2>
          <span>#{id}</span> {name}
        </h2>
        <h3>
          {status} - {species} - {gender}
        </h3>
        <p>Last known location:</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default Card;

