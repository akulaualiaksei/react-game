import React from 'react';

// import './card-item.css';

const CardItem = ({ image
  // important, done, label, onToggleImportant, onToggleDone, onDelete
    }) => {
  const back = 'back.png';

  return (
      <React.Fragment>
      <div
        className="card-front"
        style={{
          backgroundImage:`url(./${back})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
      <div
        className="card-back"
        style={{
          backgroundImage:`url(./${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        ></div>
        </React.Fragment>
  );
};

export default CardItem;
