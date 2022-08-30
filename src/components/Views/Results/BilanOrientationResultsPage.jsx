import React from 'react';
import Orientoi from '../JobsInTension/Orientoi';
import JobReady from '../SoftSkillsPage/JobReady';
import EducationalContents from '../JobExplorationsPage/EducationalContents';
import JobCards from '../JobExplorationsPage/JobCards';

const BilanOrientationResultsPage = () => {
  return (
    <>
      <JobReady />
      <JobCards />
      <EducationalContents />
      <Orientoi title={'myTalent'} talent={true} />
    </>
  );
};

export default BilanOrientationResultsPage;
