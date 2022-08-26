import React, { useState } from 'react';

import Typography from 'cozy-ui/transpiled/react/Typography';

import ShareBilanBtn from '../../Button/ShareBilanBtn';
import GlobalModal from '../../Modal/GlobalModal';
import GenericButton from '../../Button/GenericButton/GenericButton';

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

  return (
    <>
      <div className='badgeRow' style={addStyles}>
        <div className='badgeRowImageContainer'>
          <img
            src={
              offerDataMapping !== null
                ? offerDataMapping.vignettes
                : offerAPI.picture
            }
            alt=''
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
            <Icon icon={iconInfo} onClick={() => window.open(offerAPI.url)} />
          </Typography>
          <Typography className='u-mv-half' variant='body1'>
            {offerDataMapping !== null ? offerDataMapping.OF : ''}
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
            {offerDataMapping === null && (
              <GenericButton
                textContent={"En cours d'implémentation"}
                disabled={true}
                hasArrow={false}
              />
            )}
          </div>
        </div>
      </div>
      {offerDataMapping !== null ? (
        <GlobalModal
          offerData={offerDataMapping}
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
