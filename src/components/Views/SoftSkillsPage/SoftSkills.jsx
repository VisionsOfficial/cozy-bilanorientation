import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import SoftSkill from './SoftSkill'
import SoftSkillIcon from '../../../assets/icons/orientoi.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const SoftSkills = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = jsonFiles.orientoi.data || []

  const error = !datas.badges ? true : false

  return (
    <Accordion icon={SoftSkillIcon} title={t('softSkills')}>
      <Grid className="u-mv-1" container spacing={2}>
        {error && datas.length === 0 && (
          <div style={{ padding: '25px' }}>
            <h5>Données introuvables</h5>
          </div>
        )}
        {!error &&
          Object.entries(datas.badges).map(([key, value], index) => (
            <Grid key={index} item xs={12} sm={4}>
              <SoftSkill label={key} value={value} />
            </Grid>
          ))}
      </Grid>
    </Accordion>
  )
}

export default SoftSkills
