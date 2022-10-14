import React from 'react';
import { useClient } from 'cozy-client';

import log from 'cozy-logger';

import Icon from 'cozy-ui/transpiled/react/Icon';
import EmailModal from '../MethodModal/EmailModal';
import JobufoModal from '../MethodModal/JobufoModal';
import JobufoAndQuestion from '../MethodModal/JobufoAndQuestion';
import RedirectLandingPageModal from '../MethodModal/RedirectLandingPageModal';
import DefaultShareModal from '../MethodModal/DefaultShareModal';

import logoTmp from '../../../assets/icons/icon-check.svg';
import { visionsTrustApiPOST } from '../../../utils/remoteDoctypes';
import { useVisionsAccount } from '../../Hooks/useVisionsAccount';
import GlobalShareModal from '../MethodModal/GlobalShareModal';

const GlobalModal = ({
  open = false,
  closeModal,
  validateFc = () => {},
  offerAPI,
  offerDataMapping,
  offerMethodMapping,
  hardcodedMethod = null,
  specificEmail = null
}) => {
  const client = useClient();
  const { visionsAccount } = useVisionsAccount();

  const getCorrectOfferName = () => {
    if (offerAPI.publisher) {
      return offerAPI.publisher[0]?.name;
    } else {
      return '';
    }
  };

  const handleButtonClick = async (callback = () => {}) => {
    // Default behaviour for the button click to store the lead in VT
    try {
      await Promise.all([
        visionsTrustApiPOST(client, 'leadtracking', {
          leadName:
            offerMethodMapping.OF ||
            getCorrectOfferName() ||
            'UNKNOWN_PUBLISHER'
        }),
        visionsTrustApiPOST(client, 'consent', {
          leadName:
            offerMethodMapping.OF ||
            getCorrectOfferName() ||
            'UNKNOWN_PUBLISHER',
          userId: visionsAccount.id,
          publicShareURL: sessionStorage.getItem('pubshare'),
          offerURL: offerAPI.url || 'NOT_SPECIFIED'
        })
      ]);
    } catch (err) {
      log('error', 'Failed to save lead click in VisionsTrust');
    }

    if (callback) callback();

    validateFc();
  };

  const contentModal = method => {
    switch (parseInt(method)) {
      case 1:
        if (!offerDataMapping)
          return (
            <GlobalShareModal email={offerMethodMapping?.email || undefined} />
          );
        return (
          <EmailModal
            email={offerMethodMapping?.email || undefined}
            offerDataMapping={offerDataMapping}
            offerAPI={offerAPI}
            btnClickFc={handleButtonClick}
          />
        );
      case 2:
        return (
          <JobufoModal
            OF={getCorrectOfferName()}
            btnClickFc={handleButtonClick}
            offerUrl={offerAPI.url}
          />
        );
      case 3:
        return (
          <JobufoAndQuestion
            OF={getCorrectOfferName()}
            btnClickFc={handleButtonClick}
          />
        );
      case 4:
        return (
          <RedirectLandingPageModal
            offerTitle={offerAPI.title}
            OF={getCorrectOfferName()}
            redirectionUrl={offerDataMapping.url_redirection || offerAPI.url}
            btnClickFc={handleButtonClick}
          />
        );
      case 5:
        return <GlobalShareModal email={specificEmail} />;
      default:
        return (
          <DefaultShareModal
            offerTitle={offerAPI.title}
            OF={getCorrectOfferName()}
            btnClickFc={handleButtonClick}
          />
        );
    }
  };

  const handleBackdropClick = () => {
    closeModal();
  };

  return (
    <div
      className={`backdrop ${open ? 'openModal' : ''}`}
      onClick={() => handleBackdropClick()}
    >
      <div
        className='modal'
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoTmp} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>
          {contentModal(offerMethodMapping?.method || hardcodedMethod || -1)}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
