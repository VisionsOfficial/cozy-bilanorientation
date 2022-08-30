import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import EmailModal from '../MethodModal/EmailModal';
import JobufoModal from '../MethodModal/JobufoModal';
import JobufoAndQuestion from '../MethodModal/JobufoAndQuestion';
import RedirectLandingPageModal from '../MethodModal/RedirectLandingPageModal';

import logoTmp from '../../../assets/icons/icon-check.svg';

const GlobalModal = ({ open = false, closeModal, offerDataMapping }) => {
  const contentModal = method => {
    switch (parseInt(method)) {
      case 1:
        return <EmailModal offerDataMapping={offerDataMapping} />;
      case 2:
        return <JobufoModal offerDataMapping={offerDataMapping} />;
      case 3:
        return <JobufoAndQuestion offerDataMapping={offerDataMapping} />;
      case 4:
        return <RedirectLandingPageModal offerDataMapping={offerDataMapping} />;
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
          {contentModal(offerDataMapping.Methode)}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
