import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';

//IMG
import iconCalendar from '../../../assets/icons/icon-calendrier.svg';
import bgImg from '../../../assets/images/multi-ethnic-young-people-using-smartphone-and-tablet-computers.png';

const Jobdating = () => {
  return (
    <div className='jobdating' style={{ background: `url(${bgImg})` }}>
      <img src={bgImg} alt='' loading='lazy' />
      <div className='jobdatingTopWave'></div>
      <div className='jobdatingBottomWave'></div>
      <header>
        <h3>Jobdating 100% digital !</h3>
        <p>Spécial métiers du numérique</p>
      </header>
      <div className='jobdatingDote'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='jobdatingDate'>
        <Icon icon={iconCalendar} />
        <span>Jeudi 24 Novembre</span>
      </div>
      <p className='jobdatingDescription'>
        Rencontrez les organismes de formation et employeurs qui recrutent et
        échangez avec eux. Saisissez cette opportunité unique pour construire
        votre projet professionnel !{' '}
      </p>
    </div>
  );
};

export default Jobdating;
