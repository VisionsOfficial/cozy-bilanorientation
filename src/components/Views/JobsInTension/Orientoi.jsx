import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'

import Accordion from '../../Accordion'
import Badge from '../../Badge'
import BadgeTalent from '../../Badge/BadgeTalent/BadgeTalent'
import icon from '../../../assets/icons/orientoi.svg'

import ThumbIcon from '../../../assets/icons/icone-fond-metier.svg'
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
const bgBadge = '#f4fcfe'
const getThirdElements = arr => arr.slice(0, 3)

const Orientoi = ({ title, badge = false, talent = false, showType = false }) => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = getThirdElements(jsonFiles.orientoi.data?.jobCards || [])
  return (
    <Accordion
      icon={icon}
      title={t(title)}
      addStyles={styles.card}
      bgHeader={'#FFF'}
    >
      <Grid className="u-mv-1" container spacing={2}>
        {datas.map(({ name, positionnement, type }, index) => (
          <Grid key={index} item xs={12} sm={12} lg={6} xl={4}>
            {badge ? (
              <Badge
                title={name}
                mainText={t('positionning') + ` : ${positionnement}`}
                subText={showType ? 'Type : ' + type : null}
                icon={ThumbIcon}
                background={bgBadge}
                addStyles={styles.badge}
              />
            ) : null}
            {talent ? <BadgeTalent name={'Concentré'} percentage={30} /> : null}
          </Grid>
        ))}
      </Grid>
    </Accordion>
  )
}

export default Orientoi
