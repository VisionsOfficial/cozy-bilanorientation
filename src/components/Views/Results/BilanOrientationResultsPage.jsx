import React from 'react';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
import Orientoi from '../JobsInTension/Orientoi';
import JobReady from '../SoftSkillsPage/JobReady';

const BilanOrientationResultsPage = () => {
  return (
    <>
      <JobReady />
      <Orientoi title={'JobExplore'} badge={true} showType={true} />
      <InokufuAPI />
    </>
  );
};

export default BilanOrientationResultsPage;
