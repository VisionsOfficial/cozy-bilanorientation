import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import EmailModal from '../MethodModal/EmailModal';
import JobufoModal from '../MethodModal/JobufoModal';
import JobufoAndQuestion from '../MethodModal/JobufoAndQuestion';
import RedirectLandingPageModal from '../MethodModal/RedirectLandingPageModal';

import logoTmp from '../../../assets/icons/icon-check.svg';

const GlobalModal = ({ method, open = false, closeModal, offerData }) => {
  const openModal = open === false ? '' : 'openModal';

  const contentModal = method => {
    switch (method) {
      case 0:
        return <EmailModal offerData={offerData} />;
      case 1:
        return <JobufoModal offerData={offerData} />;
      case 2:
        return <JobufoAndQuestion offerData={offerData} />;
      case 3:
        return <RedirectLandingPageModal offerData={offerData} />;
      default:
        break;
    }
  };

  return (
    <div className={`modalContainer ${openModal}`}>
      <div className='modal'>
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoTmp} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>{contentModal(method)}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
