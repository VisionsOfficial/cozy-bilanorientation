import React, { useState } from 'react';

import Typography from 'cozy-ui/transpiled/react/Typography';

import ShareBilanBtn from '../../Button/ShareBilanBtn';
import GlobalModal from '../../Modal/GlobalModal';

const styles = {
  subText: {
    fontWeight: 200,
    textAlign: 'center',
    fontSize: '14px'
  }
};

const BadgeRow = ({
  title,
  mainText,
  subText,
  picture,
  url,
  addStyles,
  isPublicPage = false,
  btn = true,
  offerData = null
}) => {
  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  return (
    <>
      <div
        className='u-flex u-flex-row u-flex-items-center badgeRow'
        style={addStyles}
      >
        <div className='badgeRowImageContainer'>
          <img src={picture} alt='' />
        </div>
        <div className='badgeRowTextContainer'>
          <Typography
            className='badgeRowTitle'
            variant='h6'
            component='div'
            onClick={() => window.open(url)}
            noWrap
          >
            {title}
          </Typography>
          <Typography className='u-mv-half' variant='body1'>
            {mainText}
          </Typography>
          <Typography style={styles.subText} variant='body1'>
            {subText}
          </Typography>
          <div
            style={{
              margin: '10px 0px'
            }}
          >
            {btn && !isPublicPage && <ShareBilanBtn onClickFc={OpenModal} />}
          </div>
        </div>
      </div>
      {offerData !== null ? (
        <GlobalModal
          method={0}
          offerData={offerData}
          open={open}
          closeModal={closeModal}
        />
      ) : (
        <div>TODO</div>
      )}
    </>
  );
};

export default BadgeRow;
