import React, { useState } from 'react';

import Typography from 'cozy-ui/transpiled/react/Typography';

import ShareBilanBtn from '../../Button/ShareBilanBtn';
import GlobalModal from '../../Modal/GlobalModal';

import iconInfo from '../../../assets/icons/icon-info.svg';

import '../../../styles/badgerow.styl';
import Icon from 'cozy-ui/transpiled/react/Icon';

const styles = {
  subText: {
    fontSize: '14px'
  }
};

const BadgeRow = ({
  offerAPI,
  addStyles,
  isPublicPage = false,
  btn = true,
  offerDataMapping = null
}) => {
  const [open, setOpen] = useState(false);

  const OpenModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const getShortTitle = title => {
    if (title.includes(' | ')) return title.split(' | ')[0].trim();
    else if (title.includes(' - ')) return title.split(' - ')[0].trim();
    return title;
  };

  const openInformationUrl = () => {
    window.open(offerAPI.url);
  };

  return (
    <>
      <div className='badgeRow' style={addStyles}>
        <div className='badgeRowImageContainer'>
          <img
            src={offerDataMapping?.logo || offerAPI?.picture || ''}
            alt={`Vignette formation`}
          />
        </div>
        <div className='badgeRowTextContainer'>
          <Typography
            className='badgeRowTitle'
            variant='h6'
            component='div'
            noWrap
          >
            {getShortTitle(offerAPI.title)}
            {offerAPI.url !== '' && (
              <Icon icon={iconInfo} onClick={() => openInformationUrl()} />
            )}
          </Typography>
          <Typography className='u-mv-half' variant='body1'>
            {offerAPI.publisher ? offerAPI.publisher[0].name : ''}
          </Typography>
          <Typography
            style={styles.subText}
            className='textLineClamp'
            variant='body1'
          >
            {offerAPI.description}
          </Typography>
          <div
            style={{
              margin: '10px 0px'
            }}
          >
            {btn && !isPublicPage && offerDataMapping !== null && (
              <ShareBilanBtn onClickFc={OpenModal} />
            )}
          </div>
        </div>
      </div>
      {offerDataMapping !== null && !isPublicPage ? (
        <GlobalModal
          offerDataMapping={offerDataMapping}
          open={open}
          closeModal={closeModal}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BadgeRow;
