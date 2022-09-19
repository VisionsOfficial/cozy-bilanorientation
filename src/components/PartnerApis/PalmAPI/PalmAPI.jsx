import React, { useEffect, useState } from 'react';
import { useClient } from 'cozy-client';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import { palmApiPOST } from '../../../utils/remoteDoctypes';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Accordion from '../../Accordion';
import Loader from '../../Loader';
import Badge from '../../Badge';

import icon from '../../../assets/icons/palm.svg';
import iconJob from '../../../assets/icons/icon-emploi-fond.svg';
import { useJsonFiles } from '../../Hooks/useJsonFiles';

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

const PalmAPI = () => {
  const email = 'smartskills@visionspol.eu';
  const client = useClient();
  const { t } = useI18n();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { jsonFiles } = useJsonFiles();
  const jobCards = jsonFiles.orientoi?.data?.data?.jobCards || [];

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (!jobCards.length && isMounted) {
        setData([]);
        setLoading(false);
        setError(false);
        return;
      }

      const createSoupData = () => {
        const jcNames = jobCards.map(jc => jc.name).join(' ');
        // const jcSlugs = jobCards.map(jc => jc.slug).join(',');
        // const jcDescs = jobCards.map(jc => jc.description).join(' ');
        // return `${jcNames} ${jcSlugs} ${jcDescs}`;
        return `${jcNames}`;
      };

      let res = null;

      try {
        res = await palmApiPOST(client, { email, data: createSoupData() });
      } catch (err) {
        if (!isMounted) return;
        setError(true);
        setLoading(false);
        return;
      }

      // PALM sends back a stringified array as a response
      if (!isMounted) return;

      const content = JSON.parse(res);
      setData(content);
      setLoading(false);
      setError(false);
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [client, email, jobCards]);

  if (error)
    return (
      <Accordion
        icon={icon}
        title={t('jobsOffers')}
        addStyles={styles.card}
        bgHeader={'#FFF'}
      >
        <Grid className='u-mv-1' container spacing={2}>
          <h4>Une erreur est survenue lors de la récupération des données</h4>
        </Grid>
      </Accordion>
    );

  if (loading)
    return (
      <Accordion
        icon={icon}
        title={t('jobsOffers')}
        addStyles={styles.card}
        bgHeader={'#FFF'}
      >
        <Grid className='u-mv-1' container spacing={2}>
          <Loader
            text={"Nous récupérons les matchings avec les offres d'emploi"}
          />
        </Grid>
      </Accordion>
    );

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
        {data
          .slice(0, 2)
          .map(
            ({ mission_name, similarity, short_summary, email, url }, idx) => (
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
                  url={url}
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

export default PalmAPI;
