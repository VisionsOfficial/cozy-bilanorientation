import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import Badge from '../../Badge'
import icon from '../../../assets/icons/orientoi.svg'

import ThumbIcon from '../../../assets/icons/icon-thumb.svg'
import { useJsonFiles } from '../../Hooks/useJsonFiles'

const styles = {
  card: {
    borderRadius: '15px',
  },
  badge: {
    margin: '10px',
    padding: '20px 10px',
    borderRadius: '10px'
  }
}
const bgBadge = '#f4fcfe'
const getThirdElements = arr => arr.slice(0, 3)

const Orientoi = () => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = getThirdElements(jsonFiles.orientoi.data?.jobCards || [])
  return (
    <Accordion icon={icon} title={t('Métiers en tension proposés/sélectionnés')} addStyles={styles.card} bgHeader={'#FFF'}>
      <Grid className="u-mv-1" container>
        {datas.map(({ name, positionnement }, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Badge
              title={name}
              mainText={t('positionning') + ` : ${positionnement}`}
              icon={ThumbIcon}
              background={bgBadge}
              addStyles={styles.badge}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  )
}

export default Orientoi
