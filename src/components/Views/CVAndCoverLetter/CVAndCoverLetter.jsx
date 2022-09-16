import React, { useState } from 'react';

// Cozy components
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import FolderAddIcon from 'cozy-ui/transpiled/react/Icons/FolderAdd';
import FileInput from 'cozy-ui/transpiled/react/FileInput';

// see later for save resumes in doctype
// import { Q } from 'cozy-client'
// const BANK_DOCTYPE = 'io.cozy.bank.accounts';

// Components
import EditingDocument from './ContentResumes/EditingDocument/EditingDocument';
import SummaryDocument from './ContentResumes/SummaryDocument';
import { getPdfText } from '../../../utils/pdfjsStuff';
import { fileToArrayBuffer } from '../../../utils/fetchJsonFileByName';
import GenericButton from '../../Button/GenericButton';

import '../../../styles/resumes.styl';

const CVAndCoverLetter = () => {
  const [stepResumes, setStepResumes] = useState('');
  const [file, setFile] = useState({});

  const importDocument = async event => {
    let reader, response;
    switch (event.type) {
      case 'text/plain':
        reader = await fileToArrayBuffer(event);
        setFile({ name: event.name, text: reader, type: '' });
        setStepResumes('editing');
        break;
      case 'application/pdf':
        response = await getPdfText(event);
        setFile({ name: event.name, text: response, type: '' });
        setStepResumes('editing');
        break;
      default:
        alert("Le format de votre document n'est pas supporté");
        break;
    }
  };

  const contentResumes = method => {
    switch (method) {
      case 'editing':
        return (
          <EditingDocument stepResumes={setStepResumes} importFile={file} />
        );
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
