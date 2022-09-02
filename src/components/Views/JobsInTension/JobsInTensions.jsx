import React from 'react';
import Orientoi from './Orientoi';
import Palm from './Palm';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
import Doceo from './Doceo';

const JobsInTensions = () => {
  return (
    <>
      <Orientoi title={'offersPorposed'} badge={true} />
      <InokufuAPI keywords={'anglais,italien,photoshop'} />
      <Palm />
      <Doceo />
    </>
  );
};

export default JobsInTensions;
