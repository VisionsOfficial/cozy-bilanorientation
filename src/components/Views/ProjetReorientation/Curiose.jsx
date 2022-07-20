import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Accordion from '../../Accordion'
import CurioseIcon from '../../../assets/icons/curiose.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'
import BadgePersonality from '../../Badge/BadgePersonality'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

const Curiose = ({ title, headerBg, addStyles }) => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles.curiose?.data || []

  return (
    <Accordion
      icon={CurioseIcon}
      title={t(title)}
      bgHeader={headerBg}
      addStyles={addStyles}
    >
      <div style={{ padding: '25px' }}>
        <Grid className="u-mv-1" container spacing={2}>
          <Grid item xs={12} sm={12} lg={6} xl={4}>
            <BadgePersonality />
          </Grid>
        </Grid>
      </div>
    </Accordion>
  )
}

export default Curiose
