import React from 'react';
import { useClient } from 'cozy-client';

import log from 'cozy-logger';

import Icon from 'cozy-ui/transpiled/react/Icon';
import EmailModal from '../MethodModal/EmailModal';
import JobufoModal from '../MethodModal/JobufoModal';
import JobufoAndQuestion from '../MethodModal/JobufoAndQuestion';
import RedirectLandingPageModal from '../MethodModal/RedirectLandingPageModal';

import logoTmp from '../../../assets/icons/icon-check.svg';
import { visionsTrustApiPOST } from '../../../utils/remoteDoctypes';

const GlobalModal = ({ open = false, closeModal, offerDataMapping }) => {
  const client = useClient();

  const handleButtonClick = async (callback = () => {}) => {
    // Default behaviour for the button click to store the lead in VT
    try {
      await visionsTrustApiPOST(client, 'leadtracking', {
        leadName: offerDataMapping.OF || 'Unregistered-OF'
      });
    } catch (err) {
      log('error', 'Failed to save lead click in VisionsTrust');
    }

    if (callback) callback();
  };

  const contentModal = method => {
    switch (parseInt(method)) {
      case 1:
        return (
          <EmailModal
            offerDataMapping={offerDataMapping}
            btnClickFc={handleButtonClick}
          />
        );
      case 2:
        return (
          <JobufoModal
            offerDataMapping={offerDataMapping}
            btnClickFc={handleButtonClick}
          />
        );
      case 3:
        return (
          <JobufoAndQuestion
            offerDataMapping={offerDataMapping}
            btnClickFc={handleButtonClick}
          />
        );
      case 4:
        return (
          <RedirectLandingPageModal
            offerDataMapping={offerDataMapping}
            btnClickFc={handleButtonClick}
          />
        );
      default:
        break;
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
          {contentModal(offerDataMapping.method)}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
