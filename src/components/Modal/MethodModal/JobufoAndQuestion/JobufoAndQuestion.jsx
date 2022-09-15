import React from 'react';
import GenericButton from '../../../Button/GenericButton/GenericButton';

const JobufoAndQuestion = ({ offerData, btnClickFc }) => {
  const jobufoFormModalFc = () => {
    // TODO Integrated form
  };

  const handleClick = e => {
    e.stopPropagation();
    btnClickFc(jobufoFormModalFc);
  };

  if (offerData) {
    return (
      <section className='contentJobufoAndQuestionModal'>
        <div>
          <header>
            <h3>{offerData.OF}</h3>
          </header>
          <p>
            Veuillez répondre à ces quelques questions avant de partager votre
            bilan
          </p>
          {/* Check from for question */}
        </div>
        <GenericButton
          textContent={'Accepter le partage'}
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

export default JobufoAndQuestion;
