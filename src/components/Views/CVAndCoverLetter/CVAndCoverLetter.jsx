import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import FolderAddIcon from 'cozy-ui/transpiled/react/Icons/FolderAdd';

// Components
import EditingDocument from './ContentResumes/EditingDocument/EditingDocument';
import ImportDocumentBtn from '../../Button/ImportDocumentBtn';
import SummaryDocument from './ContentResumes/SummaryDocument';

import '../../../styles/resumes.styl';

const CVAndCoverLetter = () => {
  const contentResumes = method => {
    switch (method) {
      case true:
        return <EditingDocument />;
      case 'recap':
        return <SummaryDocument />;
      default:
        return (
          <Grid className='containerImportDocument'>
            <Icon icon={FolderAddIcon} />
            <p>
              Vous n&apos;avez pas de{' '}
              <span className='bold'>lettre de motivation ou de CV</span>,
              importez en une ou rédigez la !
            </p>
            <ImportDocumentBtn />
          </Grid>
        );
    }
  };
  return <div className='containerResumes'>{contentResumes('recap')}</div>;
};

export default CVAndCoverLetter;
