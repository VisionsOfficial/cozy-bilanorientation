import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import EmailModal from '../MethodModal/EmailModal';
import JobufoModal from '../MethodModal/JobufoModal';
import JobufoAndQuestion from '../MethodModal/JobufoAndQuestion';
import RedirectLandingPageModal from '../MethodModal/RedirectLandingPageModal';

import logoTmp from '../../../assets/icons/icon-check.svg';

const GlobalModal = ({ open = false, closeModal, offerData }) => {
  const contentModal = method => {
    switch (parseInt(method)) {
      case 1:
        return <EmailModal offerData={offerData} />;
      case 2:
        return <JobufoModal offerData={offerData} />;
      case 3:
        return <JobufoAndQuestion offerData={offerData} />;
      case 4:
        return <RedirectLandingPageModal offerData={offerData} />;
      default:
        break;
    }
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div
      className={`backdrop ${open ? 'openModal' : ''}`}
      onClick={() => handleClick()}
    >
      <div className='modal'>
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoTmp} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>{contentModal(offerData.Methode)}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
