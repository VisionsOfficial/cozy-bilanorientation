import React, { useState } from 'react';

// Components
import EditingDocument from './ContentResumes/EditingDocument/EditingDocument';
import SummaryDocument from './ContentResumes/SummaryDocument';

import '../../../styles/resumes.styl';

export const CVLETTERS_METHODS = {
  MAIN: 0,
  IMPORT: 1,
  MANUAL: 2
};

const CVAndCoverLetter = () => {
  const [stepResumes, setStepResumes] = useState(CVLETTERS_METHODS.MAIN);
  const [file, setFile] = useState([]);

  const contentResumes = method => {
    switch (method) {
      case CVLETTERS_METHODS.MANUAL:
      case CVLETTERS_METHODS.IMPORT:
        return (
          <EditingDocument
            stepResumes={setStepResumes}
            method={method}
            importFile={file.length !== 0 ? file : null}
          />
        );
      case CVLETTERS_METHODS.MAIN:
        return (
          <SummaryDocument stepResumes={setStepResumes} fileImport={setFile} />
        );
      default:
        break;
    }
  };
  return <div className='containerResumes'>{contentResumes(stepResumes)}</div>;
};

export default CVAndCoverLetter;
