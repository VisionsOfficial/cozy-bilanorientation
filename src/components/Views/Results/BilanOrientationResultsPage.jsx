import React from 'react';
import Orientoi from '../JobsInTension/Orientoi';
import JobReady from '../SoftSkillsPage/JobReady';
import EducationalContents from '../JobExplorationsPage/EducationalContents';

const BilanOrientationResultsPage = () => {
  return (
    <>
      <JobReady />
      <Orientoi title={'jobCards'} badge={true} />
      <EducationalContents />
      <Orientoi title={'myTalent'} talent={true} />
    </>
  );
};

export default BilanOrientationResultsPage;
