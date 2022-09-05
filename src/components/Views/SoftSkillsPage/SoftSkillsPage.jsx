import React from 'react';
import FiveDiscovery from './5Discovery';
import Pitangoo from '../ProjetReorientation/Pitangoo';

import JobReady from './JobReady';
import Orientoi from '../JobsInTension/Orientoi';

const SoftSkillsPage = () => {
  return (
    <>
      <JobReady />
      <Orientoi title={'myTalent'} talent={true} />
      <Pitangoo />
      <FiveDiscovery />
    </>
  );
};

export default SoftSkillsPage;
