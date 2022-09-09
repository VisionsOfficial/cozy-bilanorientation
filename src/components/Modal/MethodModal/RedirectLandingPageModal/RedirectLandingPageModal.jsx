import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const RedirectLandingPageModal = ({ offerDataMapping }) => {
  const redirect = () => {
    if (offerDataMapping.url_redirection) {
      window.open(offerDataMapping.url_redirection);
    } else {
      alert(`Aucun lien n'a été fourni par ${offerDataMapping.OF}`);
    }
  };

  if (offerDataMapping) {
    return (
      <section className='contentEmailModal'>
        <div>
          <header>
            <h3>
              Vous êtes intéressé par la formation {offerDataMapping.formation_name}
            </h3>
          </header>
          <p>
            En cliquant sur le bouton ci-dessous, vous serez redirigé vers la
            page de présentation de l&apos;offre gérée par{' '}
            <b>{offerDataMapping.OF}</b>.
          </p>
        </div>
        <GenericButton
          textContent={'Aller à la formation'}
          onClickFc={redirect}
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
