import React from 'react';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Accordion from '../Accordion';
import Badge from '../Badge';

import icon from '../../assets/icons/palm.svg';
import iconJob from '../../assets/icons/icon-emploi-fond.svg';

const styles = {
  card: {
    borderRadius: '15px'
  },
  badge: {
    padding: '20px 10px',
    borderRadius: '10px'
  }
};
const bgBadge = 'linear-gradient(85deg, #16f7b415, #21bbee15)';

const PublicPalmAPI = ({ data }) => {
  const { t } = useI18n();

  return (
    <Accordion
      icon={icon}
      title={t('jobsOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
    >
      <Grid className='u-mv-1' container spacing={2}>
        {data.length === 0 && (
          <Grid className='u-mv-1' container spacing={2}>
            <h4 style={{ paddingLeft: '20px' }}>
              Aucune offre trouvée auprès de PALM
            </h4>
          </Grid>
        )}
        {data.map(
          ({ mission_name, similarity, short_summary, email, mission_customer_url }, idx) => (
            <Grid key={idx} item xs={12} sm={12} lg={6} xl={6}>
              <Badge
                title={mission_name}
                mainText={`Taux de matching : ${Math.trunc(similarity)} %`}
                subText={short_summary}
                icon={iconJob}
                background={bgBadge}
                addStyles={styles.badge}
                btn={false}
                email={email}
                url={mission_customer_url}
              />
            </Grid>
          )
        )}
        <p className='sourceData'>
          Source de données : <span>PALM</span>
        </p>
      </Grid>
    </Accordion>
  );
};

export default PublicPalmAPI;
