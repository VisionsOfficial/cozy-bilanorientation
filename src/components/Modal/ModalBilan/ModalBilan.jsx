import React, { useState } from 'react';
import ShareBilanBtn from '../../Button/ShareBilanBtn';
import Icon from 'cozy-ui/transpiled/react/Icon';
import { useClient } from 'cozy-client';
import { log } from 'cozy-logger';

// TMP
import logoVisions from '../../../assets/icons/logo_picto.svg';
import logoTmp from '../../../assets/icons/icon-check.svg';
import { visionsTrustApiPOST } from '../../../utils/remoteDoctypes';
import { useVisionsAccount } from '../../Hooks/useVisionsAccount';

const ModalBilan = ({ open = false, closeModal, title, email }) => {
  const openModal = open === false ? '' : 'openModal';
  const client = useClient();
  const { visionsAccount } = useVisionsAccount();

  const [confirmation, setConfirmation] = useState(false);
  const confirm = async () => {
    try {
      await visionsTrustApiPOST(client, 'consent', {
        leadName: 'EMAIL_SHARE',
        userId: visionsAccount.id,
        publicShareURL: sessionStorage.getItem('pubshare'),
        offerURL: 'EMAIL_SHARE'
      });
    } catch (err) {
      log('error', 'Failed to save lead click in VisionsTrust');
    }
    setConfirmation(true);
  };

  if (!confirmation) {
    return (
      <div className={`backdrop ${openModal}`}>
        <div className='modal'>
          <div className='modalHeader'>
            <div className='modalLogo'>
              <Icon icon={logoVisions} className='modalImg' />
            </div>
            <div className='closeModal' onClick={closeModal}>
              <span>x</span>
            </div>
          </div>
          <div className='modalContent'>
            <h3 className='modalTitle'>{title}</h3>
            <p className='modalDesc'>Votre bilan va être envoyé à {email}</p>
            <div className='modalBtn'>
              <ShareBilanBtn
                textContent={'Envoyer mon bilan'}
                onClickFc={() => confirm()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`backdrop ${openModal}`}>
      <div className='modal'>
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoTmp} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>
          <h3 className='modalTitle'>Votre bilan a bien été envoyé à</h3>
          <p className='modalRecapEmail'>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalBilan;
