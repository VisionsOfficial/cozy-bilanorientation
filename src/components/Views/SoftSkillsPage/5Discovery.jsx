import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import icon from '../../../assets/icons/5discovery.svg'
// import icon from "../../../assets/icons/default_icon.svg";
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const FiveDiscovery = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles['5Discovery']?.data || []

  return (
    <Accordion icon={icon} title={t('5DiscoveryTitle')}>
      <div style={{ padding: '25px' }}>
        <h5>Bientôt disponible</h5>
      </div>
    </Accordion>
  )
}

export default FiveDiscovery
