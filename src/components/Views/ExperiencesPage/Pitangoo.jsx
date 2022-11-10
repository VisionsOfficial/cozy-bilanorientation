import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
// import icon from "../../../assets/icons/pitangoo.svg";
import icon from '../../../assets/icons/default_icon.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const PitangooOLD = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles.pitangoo?.data?.data || []

  return (
    <Accordion icon={icon} title={t('pitangooTitle')}>
      <Grid>
        {data.missions &&
          data.missions.map((m, i) => (
            <Grid key={i} item>
              <div></div>
              <h3>{m.name}</h3>
              <ul style={{ listStyleType: 'none' }}>
                {m.tendencies.map((t, y) => (
                  <li key={`${i}_${y}`}>
                    {t.name} {t.score && <>: {t.score * 100} %</>}
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
      </Grid>
    </Accordion>
  )
}

export default PitangooOLD
