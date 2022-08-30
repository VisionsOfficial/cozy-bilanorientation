import React from 'react';
import Palm from '../JobsInTension/Palm';
import Orientoi from '../JobsInTension/Orientoi';
import JobReady from '../SoftSkillsPage/JobReady';
import EducationalContents from '../JobExplorationsPage/EducationalContents';
import ContactInfo from '../../User/ContactInfo';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';

const PublicPage = () => {
  return (
    <>
      <ContactInfo />
      <Orientoi title={'JobExplore'} badge={true} showType={true} />
      <InokufuAPI isPublicPage={true} />
      <Palm isPublicPage={true} />
      <JobReady />
      <EducationalContents />
      <Orientoi title={'myTalent'} talent={true} />
    </>
  );
};

export default PublicPage;
