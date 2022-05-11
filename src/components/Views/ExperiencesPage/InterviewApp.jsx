import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Accordion from '../../Accordion'
import icon from '../../../assets/icons/interviewApp.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const InterviewApp = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const data = jsonFiles.interviewApp?.data || {}

  const dataKeys = Object.keys(data) || []

  return (
    <Accordion icon={icon} title={t('interviewAppTitle')}>
      {dataKeys.length === 0 ? (
        <div style={{ padding: '25px' }}>
          <h5>Bientôt disponible</h5>
        </div>
      ) : (
        <div style={{ padding: '25px' }}>
          <h4>Simulateur: {data.data.name}</h4>
          <ul>
            {data.data.responses.map((r, idx) => (
              <li key={idx}>
                <p>Question: {r.question}</p>
                <p>
                  <a href={r.media}>Fichier</a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Accordion>
  )
}

export default InterviewApp
