import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const DefaultShareModal = ({ OF, offerTitle, btnClickFc }) => {
  const handleClick = e => {
    e.stopPropagation();
    btnClickFc();
  };

  return (
    <section className='contentEmailModal'>
      <div>
        <header>
          <h3>Vous êtes intéressé par la formation {offerTitle}</h3>
        </header>
        <p>
          En cliquant sur le bouton ci-dessous, votre Bilan d&pos;orientation
          sera partagé avec <b>{OF}</b>. Vos données seront uniquement utilisées
          par <b>{OF}</b> pour communiquer avec vous à propos de cette formation
          et rien d&apos;autre.
        </p>
      </div>
      <GenericButton
        textContent={'Partager mon bilan'}
        onClickFc={e => handleClick(e)}
      />
    </section>
  );
};

export default DefaultShareModal;
