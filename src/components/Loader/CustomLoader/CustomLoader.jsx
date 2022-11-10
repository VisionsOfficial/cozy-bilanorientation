import React from 'react';

const CustomLoader = ({ size, text }) => {
  return (
    <div className={`lds-ring ${size ? size + '-loader' : ''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {text && <p>{text}</p>}
    </div>
  );
};

export default CustomLoader;
