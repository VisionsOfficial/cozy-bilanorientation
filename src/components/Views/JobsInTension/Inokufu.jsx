import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import BadgeRow from '../../Badge/BadgeRow/BadgeRow'
import icon from '../../../assets/icons/inokufu.svg'

import EyeIcon from '../../../assets/icons/icon-eye.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const styles = {
  card: {
    borderRadius: '15px'
  },
  badge: {
    margin: '10px',
    padding: '20px 10px',
    borderRadius: '10px',
    justifyContent: 'space-evenly',
    height: '70%'
  }
}

const bgBadge = '#e4f7fd'
const getLastElements = (arr, x) => arr.slice(Math.max(arr.length - x, 1))

const Inokufu = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = getLastElements(jsonFiles.inokufu.data?.data || [], 3)

  return (
    <Accordion
      icon={icon}
      title={t('formationOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
    >
      <Grid className="u-mv-1" container>
        {datas.map(({ title, keywords, picture, url }, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <BadgeRow
              title={title}
              mainText={keywords}
              icon={EyeIcon}
              picture={picture}
              url={url}
              background={bgBadge}
              addStyles={styles.badge}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  )
}

export default Inokufu
