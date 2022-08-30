import React, { useState } from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const publicLinkTMP = `${location.protocol}//${location.host}/#/bilanorientation?shareCode=45dsf45`;

const EmailModal = ({ offerDataMapping }) => {
  const email = offerDataMapping['envoi bilan'];
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = e => {
    e.stopPropagation();
    setConfirmed(true);
    // TODO Send mail via VisionsTrust here
  };

  const data = {
    title: !confirmed
      ? `Vous êtes intéressé par la formation ${offerDataMapping.formation}`
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
          <a href={'/#/bilanorientation'} className='modalPublicLink'>
            {publicLinkTMP}
          </a>
        </p>
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
