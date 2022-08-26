import React, { useState, useRef, useEffect } from 'react';
import { useClient } from 'cozy-client';

import Icon from 'cozy-ui/transpiled/react/Icon';
import logoVisions from '../../../assets/icons/logo_picto.svg';
import {
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../../../utils/visions.cozy';
import { visionsTrustApiPOST } from '../../../utils/remoteDoctypes';

// TODO : CHANGE THIS TO COZY'S NEW ID SYSTEM
const EMAIL = 'felix@visionspol.eu';

const MissingPhoneNumberModal = ({ open = false }) => {
  const inputRef = useRef();
  const client = useClient();

  const [isOpen, setIsOpen] = useState(open);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [confirmation, setConfirmation] = useState(false);

  const confirm = async () => {
    setConfirmation(true);
    if (inputRef.current.value) {
      const phoneNumber = inputRef.current.value;
      setHasPhoneNumber(phoneNumber);
      await visionsTrustApiPOST(client, 'user-phone-number', {
        email: EMAIL,
        phoneNumber
      });
      await updateVisionsCozyDocument(client, 'user', {
        phoneNumber
      });
    }
  };

  const setHasPhoneNumber = phoneNumber => {
    setPhoneNumber(phoneNumber);
    setPhoneNumberLoading(false);
    setPhoneNumberError(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Check if phoneNumber is registered
  useEffect(() => {
    const getPhoneNumber = async () => {
      const userInfo = await getVisionsCozyDocument(client, 'user');
      if (userInfo?.phoneNumber) return setHasPhoneNumber(userInfo.phoneNumber);

      // Here we don't have the phone number stored in the cozy
      const visionsUserInfo = await visionsTrustApiPOST(client, 'user', {
        email: EMAIL
      });

      if (visionsUserInfo?.user?.phoneNumber) {
        // Save phoneNumber to cozy file
        await updateVisionsCozyDocument(client, 'user', {
          phoneNumber: visionsUserInfo.user.phoneNumber
        });
        return setHasPhoneNumber(visionsUserInfo.user.phoneNumber);
      }

      // No phoneNumber found
      setPhoneNumberLoading(false);
    };

    getPhoneNumber().catch(() => {
      setPhoneNumberError(true);
      setPhoneNumberLoading(false);
    });
  }, [client]);

  // DEV
  const removePhoneNumber = async () => {
    await updateVisionsCozyDocument(client, 'user', { phoneNumber: undefined });
    setPhoneNumber('');
    setPhoneNumberError(false);
    setPhoneNumberLoading(false);
  };

  return (
    <div className={`backdrop ${isOpen ? 'openModal' : ''}`}>
      <div className='modal'>
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoVisions} className='modalImg' />
          </div>
          <div className='closeModal' onClick={() => closeModal()}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>
          {!confirmation &&
            phoneNumber &&
            !phoneNumberError &&
            !phoneNumberLoading && (
              <>
                <div>Numéro : {phoneNumber}</div>
                <button onClick={() => removePhoneNumber()}>
                  DEBUG - REMOVE NUMBER FROM COZY FILE
                </button>
              </>
            )}
          {!confirmation && phoneNumberLoading && (
            <div>Veuillez patienter, nous vérifions vos informations...</div>
          )}
          {!confirmation &&
            !phoneNumberLoading &&
            !phoneNumber &&
            !phoneNumberError && (
              <>
                <h3 className='modalTitle'>
                  Veuillez renseigner votre numéro de téléphone
                </h3>
                <label htmlFor='phoneNumber'>Numéro de téléphone</label>
                <input
                  ref={inputRef}
                  type='tel'
                  name='phoneNumber'
                  id='phoneNumber'
                  required={true}
                />
                <div className='modalBtn'>
                  <button onClick={() => confirm()}>Valider</button>
                </div>
              </>
            )}
          {confirmation && (
            <h3>Merci, nous avons bien enregistré votre numéro de téléphone</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingPhoneNumberModal;
