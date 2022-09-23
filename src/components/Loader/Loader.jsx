import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = ({ text = '', size = 70 }) => {
  return (
    <div className='loadingContainer'>
      <CircularProgress size={size} />
      <div>{text}</div>
    </div>
  );
};

export default Loader;
