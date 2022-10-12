import React, { useState } from 'react';
import { useClient } from 'cozy-client';
import log from 'cozy-logger';

import Typography from 'cozy-ui/transpiled/react/Typography';

import ShareBilanBtn from '../../Button/ShareBilanBtn';
import GlobalModal from '../../Modal/GlobalModal';

import iconInfo from '../../../assets/icons/icon-info.svg';

import '../../../styles/badgerow.styl';
import Icon from 'cozy-ui/transpiled/react/Icon';
import { getVisionsCozyDocument } from '../../../utils/visions.cozy';

const styles = {
  subText: {
    fontSize: '14px'
  }
};

const BadgeRow = ({
  offerAPI,
  addStyles,
  fixedPicture = null,
  isPublicPage = false,
  btn = true,
  offerDataMapping = null,
  offerMethodMapping = null,
  alreadyApplied = false
}) => {
  const [open, setOpen] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const client = useClient();

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

  const validateShare = async () => {
    setHasShared(true);
    try {
      const document = await getVisionsCozyDocument(client, 'sentApplications');
      if (!document.applications) document.applications = [];
      if (document.applications.includes(offerAPI.title)) return;
      document.applications.push(offerAPI.title);
      await client.save(document);
    } catch (err) {
      log('error', err);
    }
  };

  return (
    <>
      <div className='badgeRow' style={addStyles}>
        <div className='badgeRowImageContainer'>
          <img
            src={
              fixedPicture || offerDataMapping?.logo || offerAPI?.picture || ''
            }
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
            {offerAPI?.publisher ? offerAPI?.publisher[0]?.name || '' : ''}
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
            {btn && !isPublicPage && offerMethodMapping !== null && (
              <>
                {hasShared || alreadyApplied ? (
                  <p>Bilan partagé !</p>
                ) : (
                  <ShareBilanBtn onClickFc={OpenModal} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {offerMethodMapping !== null && !isPublicPage ? (
        <GlobalModal
          offerDataMapping={offerDataMapping}
          offerMethodMapping={offerMethodMapping}
          offerAPI={offerAPI}
          open={open}
          closeModal={closeModal}
          validateFc={validateShare}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BadgeRow;
