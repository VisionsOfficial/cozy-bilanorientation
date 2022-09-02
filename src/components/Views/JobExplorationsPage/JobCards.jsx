import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import Accordion from '../../Accordion';
import Badge from '../../Badge';
import icon from '../../../assets/icons/orientoi.svg';
import { useJsonFiles } from '../../Hooks/useJsonFiles';
import ThumbIcon from '../../../assets/icons/icone-fond-metier.svg';

const styles = {
  card: {
    borderRadius: '15px'
  },
  badge: {
    padding: '20px 10px',
    borderRadius: '10px',
    margin: '10px',
    minWidth: '260px',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 20
  }
};
const bgBadge = '#f4fcfe';

const JobCards = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.orientoi.data?.jobCards || [];

  return (
    <Accordion icon={icon} title={t('jobCards')}>
      <Grid className='u-mv-1' container spacing={2}>
        {datas.map(({ name, positionnement, type }, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            style={{ minWidth: 290, display: 'flex', alignItems: 'stretch' }}
          >
            <Badge
              icon={ThumbIcon}
              background={bgBadge}
              addStyles={styles.badge}
              title={name}
              mainText={t('positionning') + ` : ${positionnement}`}
              subText={t('type') + ` : ${type}`}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
};

export default JobCards;
