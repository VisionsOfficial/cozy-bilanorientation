import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const RedirectLandingPageModal = ({
  OF,
  redirectionUrl,
  offerTitle,
  btnClickFc
}) => {
  const redirect = () => {
    if (redirectionUrl) {
      window.open(redirectionUrl);
    } else {
      alert(`Aucun lien n'a été fourni par ${OF}`);
    }
  };

  const handleClick = e => {
    e.stopPropagation();
    btnClickFc(redirect);
  };

  if (OF && offerTitle) {
    return (
      <section className='contentEmailModal'>
        <div>
          <header>
            <h3>Vous êtes intéressé par la formation {offerTitle}</h3>
          </header>
          <p>
            En cliquant sur le bouton ci-dessous, vous serez redirigé vers la
            page de présentation de l&apos;offre gérée par <b>{OF}</b>.
          </p>
        </div>
        <GenericButton
          textContent={'Aller à la formation'}
          onClickFc={e => handleClick(e)}
        />
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
