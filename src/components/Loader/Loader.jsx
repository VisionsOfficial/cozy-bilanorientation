import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = ({ text = '' }) => {
  return (
    <div className='loadingContainer'>
      <CircularProgress size={70} />
      <div>{text}</div>
    </div>
  );
};

export default Loader;
