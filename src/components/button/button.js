import React from 'react';

const Button = ({label, handleClick}) => {

  return (
    <button
      onClick={handleClick}
    >
      {/* {this.props.label} */}
      {label}
    </button>
  )
}

export default Button;