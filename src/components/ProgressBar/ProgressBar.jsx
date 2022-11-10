import React from 'react';

const styles = {
  container: {
    backgroundColor: '#d8d8d8',
    borderRadius: '20px',
    position: 'relative',
    margin: '15px 0',
    height: '30px',
    width: '300px'
  },
  done: {
    background: 'linear-gradient(to right, #16f7b465, #21bbee65)',
    borderRadius: '20px',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 0,
    opacity: 1,
    transition: '.5s ease .3s'
  }
};

const ProgressBar = ({ done }) => {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.done, width: done + '%' }}>{done}%</div>
    </div>
  );
};

export default ProgressBar;
