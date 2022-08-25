import React from 'react';

const EmailModal = ({ offerData }) => {
  return (
    <section>
      <header>
        <h3>{offerData.title}</h3>
      </header>
      <p>Votre bilan va être envoyé à {offerData.email}</p>
    </section>
  );
};

export default EmailModal;
