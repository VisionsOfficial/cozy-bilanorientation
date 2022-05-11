import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import icon from '../../../assets/icons/becomino.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'
import EducationalContent from './EducationalContent'

const Becomino = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles.becomino?.data?.data?.liked || []

  return (
    <Accordion icon={icon} title={t('becominoTitle')}>
      <Grid className="u-mv-1 u-ph-1" container spacing={2}>
        {data.map(({ picture, provider, timestamp, title, url }, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <EducationalContent
              date={timestamp}
              keywords={provider}
              picture={picture}
              title={title}
              url={url}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  )
}

export default Becomino
