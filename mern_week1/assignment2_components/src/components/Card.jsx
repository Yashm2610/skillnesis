import React from 'react';
import './styles.css';

const Card = ({ title, description, image, children }) => {
  return (
    <div className="card">
      {image && <div className="card-image" style={{ backgroundImage: `url(${image})` }}></div>}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
