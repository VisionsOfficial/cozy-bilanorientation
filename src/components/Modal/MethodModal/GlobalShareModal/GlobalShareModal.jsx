import React, { useRef, useState } from 'react';
import { trySendBOMail } from '../../../../utils/sendMail';
import GenericButton from '../../../Button/GenericButton/GenericButton';
import { useVisionsAccount } from '../../../Hooks/useVisionsAccount';
import { useClient } from 'cozy-client';
import log from 'cozy-logger';
import { visionsTrustApiPOST } from '../../../../utils/remoteDoctypes';
import Loader from '../../../Loader';

const inputStyle = {
  width: '100%',
  padding: '5px 10px',
  borderRadius: '20px',
  margin: '10px 0'
};

const GlobalShareModal = ({ email }) => {
  const { visionsAccount } = useVisionsAccount();
  const client = useClient();

  const [confirmation, setConfirmation] = useState(false);
  const [receiver, setReceiver] = useState(email || '');
  const [loader, setLoader] = useState(false);

  const emailRef = useRef();

  const handleClick = async e => {
    e.stopPropagation();

    const email = emailRef?.current?.value;
    setLoader(true);

    // Don't call btnClickFc here as we override the calls to VT
    try {
      await visionsTrustApiPOST(client, 'consent', {
        leadName: 'GLOBAL_SHARE: ' + email,
        userId: visionsAccount.id,
        publicShareURL: sessionStorage.getItem('pubshare'),
        offerURL: 'GLOBAL_SHARE'
      });
    } catch (err) {
      log('error', err);
    }

    setReceiver(email);
    setConfirmation(true);
    try {
      await trySendBOMail(client, email, email, visionsAccount);
    } catch (err) {
      log('error', err);
    }

    setLoader(false);
  };

  return (
    <section className='contentEmailModal'>
      <div>
        <header>
          <h3>Partage du Bilan</h3>
        </header>
        {loader ? (
          <Loader />
        ) : (
          <>
            {!confirmation ? (
              <>
                {email ? (
                  <>En validant, votre bilan sera partagé à {email}</>
                ) : (
                  <>
                    <p>
                      Veuillez sélectionner l&apos;email vers lequel envoyer
                      votre bilan.
                    </p>
                    <input
                      style={inputStyle}
                      ref={emailRef}
                      type='email'
                      placeholder='email'
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <p>Votre bilan a bien été partagé à {receiver}</p>
              </>
            )}
          </>
        )}
      </div>
      {confirmation === false && loader === false && (
        <GenericButton
          textContent={'Partager mon bilan'}
          onClickFc={e => handleClick(e)}
        />
      )}
    </section>
  );
};

export default GlobalShareModal;
