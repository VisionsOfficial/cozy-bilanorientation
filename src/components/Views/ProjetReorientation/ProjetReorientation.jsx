import React from 'react';
import Orientoi from '../JobsInTension/Orientoi';
import Pitangoo from './Pitangoo';
import Curiose from './Curiose';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
// import Inokufu from '../JobsInTension/Inokufu';
// import JobReady from './JobReady';

const styles = {
  card: {
    borderRadius: '15px'
  }
};

const ProjetReorientation = () => {
  return (
    <>
      <Orientoi title={'JobExplore'} badge={true} showType={true} />
      {/* <Inokufu /> */}
      <InokufuAPI keywords={'anglais,italien,photoshop'} />
      <Orientoi title={'myTalent'} talent={true} />
      <Pitangoo headerBg={'#fff'} addStyles={styles.card} />
      <Curiose
        headerBg={'#fff'}
        title={'curiose.personality'}
        addStyles={styles.card}
      />
      {/* <JobReady
        headerBg={'#FFF'}
        addStyles={styles.card}
        title={'softSkillsCV'}
      /> */}
    </>
  );
};

export default ProjetReorientation;
