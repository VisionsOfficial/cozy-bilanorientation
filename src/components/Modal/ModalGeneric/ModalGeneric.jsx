import React, { useState, useRef } from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import { useClient } from 'cozy-client';
import { useVisionsAccount } from '../../Hooks/useVisionsAccount';

import ShareBilanBtn from '../../Button/ShareBilanBtn';

// TMP
import logoTmp from '../../../assets/icons/icon-check.svg';
import logoVisions from '../../../assets/icons/logo_picto.svg';
import { trySendBOMail } from '../../../utils/sendMail';

const ModalGeneric = ({ open = false, closeModal }) => {
  const openModal = open === false ? '' : 'openModal';

  const emailRef = useRef();
  const client = useClient();
  const { visionsAccount } = useVisionsAccount();

  const [confirmation, setConfirmation] = useState(false);
  const [saveEmail, setSaveEmail] = useState('');

  const confirm = async () => {
    setConfirmation(true);
    if (!emailRef.current) return;
    const email = emailRef.current.value;
    setSaveEmail(email);

    await trySendBOMail(client, email, email, visionsAccount);
  };

  if (confirmation) {
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
          <div
            className='modalContent'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h3 className='modalTitle'>Votre bilan a bien été envoyé à</h3>
            <p className='modalRecapEmail'>{saveEmail}</p>
            <p>
              Vous pouvez également partager le lien suivant pour donner accès à
              votre bilan d&apos;orientation : <br />
              <br />
              <a
                href={sessionStorage.getItem('pubshare')}
                className='modalPublicLink'
              >
                {sessionStorage.getItem('pubshare')}
              </a>
            </p>
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
            <Icon icon={logoVisions} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div
          className='modalContent'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h3 className='modalTitle' style={{ paddingBottom: '5px' }}>
            Veuillez informer l&apos;adresse email vers laquelle envoyer votre
            Bilan
          </h3>
          <input
            ref={emailRef}
            type='email'
            name='email'
            id='email'
            required={true}
            placeholder='Adresse Email'
          />
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
};

export default ModalGeneric;
