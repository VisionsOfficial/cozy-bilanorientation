import React from 'react';
import Orientoi from './Orientoi';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
import Doceo from './Doceo';
import PalmAPI from '../../PartnerApis/PalmAPI/PalmAPI';

const JobsInTensions = () => {
  return (
    <>
      <Orientoi title={'offersPorposed'} badge={true} isTension={true} />
      <InokufuAPI isTension={true} project={'smartskills'} />
      <PalmAPI />
      <Doceo />
    </>
  );
};

export default JobsInTensions;
