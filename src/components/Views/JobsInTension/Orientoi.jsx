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
    borderRadius: '10px',
    margin: '10px',
    minWidth: '260px',
    width: '30%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 20
  }
}
const bgBadge = '#f4fcfe'
const getThirdElements = arr => arr.slice(0, 3)

const Orientoi = ({
  title,
  badge = false,
  talent = false,
  showType = false
}) => {
  const { t } = useI18n()
  const { jsonFiles } = useJsonFiles()
  const datas = getThirdElements(jsonFiles.orientoi.data?.jobCards || [])
  const badges = jsonFiles.orientoi.data?.badges || []

  return (
    <Accordion
      icon={icon}
      title={t(title)}
      addStyles={styles.card}
      bgHeader={'#FFF'}
    >
      <Grid className="u-mv-1" container spacing={2}>
        <Grid item style={styles.container}>
          {badge ? (
            <>
              {datas.map(({ name, positionnement, type }, index) => (
                <Badge
                  key={index}
                  title={name}
                  mainText={t('positionning') + ` : ${positionnement}`}
                  subText={showType ? 'Type : ' + type : null}
                  icon={ThumbIcon}
                  background={bgBadge}
                  addStyles={styles.badge}
                />
              ))}
              <p className="sourceData">
                Source de données : <span>Orientoi</span>
              </p>
            </>
          ) : null}
          {talent ? (
            <>
              {Object.entries(badges).map(([key, value], index) => (
                <BadgeTalent key={index} name={key} percentage={value} />
              ))}
              <p className="sourceData">
                Source de données : <span>Orientoi</span>
              </p>
            </>
          ) : null}
        </Grid>
      </Grid>
    </Accordion>
  )
}

export default Orientoi
