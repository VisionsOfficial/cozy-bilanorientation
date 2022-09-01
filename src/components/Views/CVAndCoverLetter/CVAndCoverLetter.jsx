import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import FolderAddIcon from 'cozy-ui/transpiled/react/Icons/FolderAdd';

import '../../../styles/resumes.styl';

const CVAndCoverLetter = () => {
  return (
    <div className='containerResumes'>
      <Grid>
        <Icon icon={FolderAddIcon} />
        <p>
          Vous n'avez pas de <span>lettre de motivation ou de CV</span>,
          importez en une ou rédigez la !
        </p>
      </Grid>
    </div>
  );
};

export default CVAndCoverLetter;
