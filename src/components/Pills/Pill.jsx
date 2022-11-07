import React from 'react';

import '../../styles/pills.styl';

export const PILL_TYPES = {
  DANGER: 'danger',
  INFO: 'info',
  WARN: 'warn',
  SUCCESS: 'success'
};

const Pill = ({ textContent, type = PILL_TYPES.INFO }) => {
  return <></>
  
  // return (
  //   <>
  //     <div className={`pill pill--${type}`}>{textContent}</div>
  //   </>
  // );
};

export default Pill;
