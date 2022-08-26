import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const JobufoModal = ({ offerData }) => {
  if (offerData) {
    return (
      <section className='contentJobufoModal'>
        <div>
          <header>
            <h3>{offerData.OF}</h3>
          </header>
          <p>Votre bilan sera partagé automatiquement</p>
        </div>
        <GenericButton textContent={'Accepter le partage'} />
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

export default JobufoModal;
