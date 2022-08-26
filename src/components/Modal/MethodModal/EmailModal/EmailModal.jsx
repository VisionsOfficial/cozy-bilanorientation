import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const EmailModal = ({ offerData }) => {
  const email = offerData['envoi bilan'];

  if (email) {
    return (
      <section className='contentEmailModal'>
        <div>
          <header>
            <h3>{offerData.OF}</h3>
          </header>
          <p>Votre bilan va être envoyé à {email}</p>
        </div>
        <GenericButton textContent={'Envoyer mon bilan'} />
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
