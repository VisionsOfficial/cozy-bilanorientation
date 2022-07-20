import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import JobReadyIcon from '../../../assets/icons/jobready.svg'
import LockIcon from 'cozy-ui/transpiled/react/Icons/Lock'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ImportDocumentBtn from '../../Button/ImportDocumentBtn'
// import { useJsonFiles } from '../../Hooks/useJsonFiles'

const JobReady = ({ headerBg, addStyles, title }) => {
  const { t } = useI18n()
  // const { jsonFiles } = useJsonFiles()
  // const datas = jsonFiles.jobready.data?.data?.[0]?.fields || []

  return (
    <Accordion
      icon={JobReadyIcon}
      title={t(title)}
      addStyles={addStyles}
      bgHeader={headerBg}
    >
      <Grid className="u-mv-1" container spacing={2}>
        <div className="importCVContainer">
          <Icon icon={LockIcon} />
          <p className="importCV">
            Importez <span>votre lettre de motivation ou CV</span> pour
            découvrir les <span>softskills qui en ressortent</span>
          </p>
          <ImportDocumentBtn />
        </div>
      </Grid>
    </Accordion>
  )
}

export default JobReady
