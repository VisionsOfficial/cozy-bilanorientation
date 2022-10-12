import React, { useEffect } from 'react';

import Becomino from './Becomino';
import Orientoi from '../JobsInTension/Orientoi';
import EducationalContents from './EducationalContents';

const JobExplorationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Orientoi title={'JobExplore'} badge={true} showType={true} />
      <EducationalContents />
      <Becomino />
    </>
  );
};

export default JobExplorationsPage;
