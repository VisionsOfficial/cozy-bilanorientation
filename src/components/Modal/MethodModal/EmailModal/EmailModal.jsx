import React, { useState } from 'react';
import { useClient } from 'cozy-client';
import { trySendBOMail } from '../../../../utils/sendMail';
import GenericButton from '../../../Button/GenericButton/GenericButton';
import { useVisionsAccount } from '../../../Hooks/useVisionsAccount';

const EmailModal = ({ offerAPI, offerDataMapping, btnClickFc, email }) => {
  const { visionsAccount } = useVisionsAccount();
  const client = useClient();
  const [confirmed, setConfirmed] = useState(false);

  const emailModalClickFc = async () => {
    if (!email) return;
    setConfirmed(true);

    await trySendBOMail(client, email, email, visionsAccount);

    const usedUrl = offerDataMapping.url_redirection
      ? offerDataMapping.url_redirection
      : offerAPI.url;
    if (usedUrl) {
      setTimeout(() => {
        window.open(usedUrl);
      }, 2000);
    }
  };

  const handleClick = e => {
    e.stopPropagation();
    btnClickFc(emailModalClickFc);
  };

  const data = {
    title: !confirmed
      ? `Vous êtes intéressé par la formation ${offerDataMapping?.formation_name}`
      : `Votre bilan a bien été partagé à ${email}`,
    body: !confirmed ? (
      <>
        <p>
          Envoyer votre bilan à <b>{offerDataMapping.OF}</b> qui vous
          recontactera pour en discuter. Vos données seront uniquement utilisées
          par <b>{offerDataMapping.OF}</b> pour communiquer avec vous à propos
          de cette formation et rien d&apos;autre.
        </p>
        <p>
          Votre bilan sera envoyé à <b>{email}</b>
        </p>
      </>
    ) : (
      <>
        {' '}
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
        {offerDataMapping.url_redirection !== '' && (
          <p>Vous allez être redirigé vers {offerDataMapping.OF}</p>
        )}
      </>
    )
  };

  if (email) {
    return (
      <section className='contentEmailModal'>
        <div>
          <header>
            <h3>{data.title}</h3>
          </header>
          {data.body}
        </div>
        {!confirmed && (
          <GenericButton
            textContent={'Envoyer mon bilan'}
            onClickFc={e => handleClick(e)}
          />
        )}
      </section>
    );
  } else {
    return (
      <section>
        <div>
          Désolé, nous n&apos;aposavons pas les informations nécessaires pour
          envoyer votre Bilan d&apos;aposOrientation
        </div>
      </section>
    );
  }
};

export default EmailModal;
