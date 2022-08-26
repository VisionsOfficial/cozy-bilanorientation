import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const RedirectLandingPageModal = ({ offerData }) => {
  if (offerData) {
    return (
      <section className='contentJobufoModal'>
        <div>
          <header>
            <h3>{offerData.OF}</h3>
          </header>
          <p>Vous serez rediriger vers un site externe</p>
        </div>
        <GenericButton textContent={'Accepter la redirection'} />
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

export default RedirectLandingPageModal;
