import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import Badge from '../../Badge'
import icon from '../../../assets/icons/palm.svg'

import { useJsonFiles } from '../../Hooks/useJsonFiles'

const styles = {
  card: {
    borderRadius: '15px'
  },
  badge: {
    padding: '20px 10px',
    borderRadius: '10px'
  }
}

const bgBadge = 'linear-gradient(85deg, #16f7b415, #21bbee15)'
const getThirdElements = arr => arr.slice(0, 3)

const Palm = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = getThirdElements(jsonFiles.PALM.data || [])

  return (
    <Accordion
      icon={icon}
      title={t('jobsOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
    >
      <Grid className="u-mv-1" container spacing={2}>
        {datas.map(
          ({ mission_name, similarity, short_summary, email, url }, index) => (
            <Grid key={index} item xs={12} sm={12} lg={6} xl={4}>
              <Badge
                title={mission_name}
                mainText={`Taux de matching : ${Math.trunc(similarity)} %`}
                subText={short_summary}
                background={bgBadge}
                addStyles={styles.badge}
                btn={true}
                email={email}
                url={url}
              />
            </Grid>
          )
        )}
      </Grid>
    </Accordion>
  )
}

export default Palm
