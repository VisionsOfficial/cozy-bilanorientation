import React, { useState } from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import FolderAddIcon from 'cozy-ui/transpiled/react/Icons/FolderAdd';
import FileInput from 'cozy-ui/transpiled/react/FileInput';

// Components
import EditingDocument from './ContentResumes/EditingDocument/EditingDocument';
import SummaryDocument from './ContentResumes/SummaryDocument';

import '../../../styles/resumes.styl';
import GenericButton from '../../Button/GenericButton';

const CVAndCoverLetter = () => {
  const [stepResumes, setStepResumes] = useState('');
  const [file, setFile] = useState({});

  const importDocument = event => {
    if (event.type === 'text/plain' || event.type === 'application/pdf') {
      setFile(event);
      setStepResumes('editing');
    } else {
      alert("Le format de votre document n'est pas supporté");
    }
  };

  const contentResumes = method => {
    switch (method) {
      case 'editing':
        return <EditingDocument stepResumes={setStepResumes} document={file} />;
      case 'recap':
        return <SummaryDocument stepResumes={setStepResumes} file={setFile} />;
      default:
        return (
          <Grid className='containerImportDocument'>
            <Icon icon={FolderAddIcon} />
            <p className='informationImportDocument'>
              Vous n&apos;avez pas de{' '}
              <span className='bold'>lettre de motivation ou de CV</span>,
              importez en une ou rédigez la !
            </p>
            <FileInput className='file-selector' onChange={importDocument}>
              <GenericButton
                textContent={'Ajouter un document'}
                color={'gradient'}
                role={'button'}
                tag={'span'}
              />
            </FileInput>
          </Grid>
        );
    }
  };
  return <div className='containerResumes'>{contentResumes(stepResumes)}</div>;
};

export default CVAndCoverLetter;
