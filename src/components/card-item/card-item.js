import React from 'react';

const CardItem = ({ image, id }) => {
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
        }}>{id}</div>
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
