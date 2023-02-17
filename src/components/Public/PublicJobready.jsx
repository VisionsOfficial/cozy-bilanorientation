import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import Accordion from '../Accordion';
import Badge from '../Badge';
import JobReadyIcon from '../../assets/icons/jobready.svg';
import iconIdea from '../../assets/icons/icon-JR-soft-skills.svg';

const styles = {
  badge: {
    background: '#f3f4f6',
    borderRadius: 10,
    padding: '10px 5px'
  }
};

const JobReady = ({ data }) => {
  const { t } = useI18n();
  const datas = data;

  if (!datas?.length) return null;

  return (
    <Accordion icon={JobReadyIcon} title={t('badges')}>
      <Grid className='u-mv-1' container spacing={2}>
        {datas.length === 0 && (
          <div style={{ padding: '25px' }}>
            <h5>Données introuvables</h5>
          </div>
        )}
        {datas.length !== 0 &&
          datas.map(({ context: contexts, level, skill }, index) => (
            <Grid key={index} item xs={12} sm={4}>
              <Badge
                title={skill.name || ''}
                mainText={t('context') + ` : ${contexts.join(', ')}`}
                subText={t('level') + ` : ${level}`}
                icon={iconIdea}
                addStyles={styles.badge}
              />
            </Grid>
          ))}
      </Grid>
    </Accordion>
  );
};

export default JobReady;
