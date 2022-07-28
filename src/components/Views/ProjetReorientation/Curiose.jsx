import React, { useRef } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Accordion from '../../Accordion'
import CurioseIcon from '../../../assets/icons/curiose.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'
import BadgePersonality from '../../Badge/BadgePersonality'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

const Curiose = ({ title, headerBg, addStyles, code, setCurioseCode }) => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles.curiose?.data || []

  const refInput = useRef(null)

  const getCode = () => {
    if (!refInput) return
    setCurioseCode(refInput.current.value)
  }

  return (
    <Accordion
      icon={CurioseIcon}
      title={t(title)}
      bgHeader={headerBg}
      addStyles={addStyles}
    >
      <div style={{ padding: '25px', width: '100%' }}>
        {code ? (
          <Grid className="u-mv-1" container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} xl={4}>
              <BadgePersonality />
              <p className="sourceData">
                Source de données : <span>Curiose.</span>
              </p>
            </Grid>
          </Grid>
        ) : (
          <div className="codeContainer">
            <div className="codeInput">
              <label htmlFor="code">Entrer votre code Curiose.</label>
              <input type="text" name="code" id="code" ref={refInput} />
            </div>
            <button onClick={getCode}>Entrer</button>
          </div>
        )}
      </div>
    </Accordion>
  )
}

export default Curiose
