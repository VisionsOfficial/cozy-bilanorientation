import React from "react";
import Inokufu from "../JobsInTension/Inokufu";
import Palm from "../JobsInTension/Palm";
import Orientoi from "../JobsInTension/Orientoi";
import JobReady from "../SoftSkillsPage/JobReady";
import EducationalContents from "../JobExplorationsPage/EducationalContents";
import SoftSkills from "../SoftSkillsPage/SoftSkills";

const PublicPage = () => {
  return (
    <>
      <Orientoi />
      <Inokufu isPublicPage={true} />
      <Palm isPublicPage={true} />
      <JobReady />
      <EducationalContents />
      <SoftSkills />
    </>
  );
};

export default PublicPage;
