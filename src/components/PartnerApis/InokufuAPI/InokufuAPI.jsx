import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import { inokufuApiGET } from '../../../utils/remoteDoctypes';
import Accordion from '../../Accordion';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import BadgeRow from '../../Badge/BadgeRow';

// IMG
import icon from '../../../assets/icons/inokufu.svg';
import EyeIcon from '../../../assets/icons/icon-eye.svg';

const styles = {
  card: {
    borderRadius: '15px',
    paddingBottom: 30
  },
  badge: {
    padding: '8px 10px',
    borderRadius: '10px',
    height: '100%',
    background: '#f3f4f6'
  }
};

const InokufuAPI = ({ provider = 'visions', keywords, mappingData }) => {
  const client = useClient();
  const { t } = useI18n();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [extraDataToggled, setExtraDataToggled] = useState(false);

  const getOfferMappingData = url => {
    if (!mappingData) return null;
    const idx = mappingData?.of?.findIndex(o => o['lien redirection'] === url);
    if (idx === -1) return null;

    return mappingData.of[idx];
  };

  useEffect(() => {
    const getData = async () => {
      const res = await inokufuApiGET(client, { provider, keywords });
      if (res.statusCode !== 200) {
        setLoading(false);
        setError(true);
        return;
      }

      if (res?.response?.content) {
        const content = res.response.content;
        if (content.length > 3) setData(content);
        else setData(content);
        setLoading(false);
        setError(false);
      }
    };

    getData();
  }, [client, keywords, provider]);

  const toggleViewMore = () => {
    setExtraDataToggled(!extraDataToggled);
  };

  if (error)
    return <div>Une erreur est survenue lors du chargement des données</div>;

  if (loading)
    return (
      <div>Veuillez patienter, nous récupérons les offres adaptées...</div>
    );

  return (
    <Accordion
      icon={icon}
      title={t('formationOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
      btnSeeMore={data.length > 3}
      seeMoreFC={toggleViewMore}
      seeMoreToggled={extraDataToggled}
    >
      <Grid>
        {data.slice(0, 3).map((offer, index) => (
          <Grid key={index} item xs={12} sm={12}>
            <BadgeRow
              title={offer.title}
              mainText={offer.description}
              icon={EyeIcon}
              picture={offer.picture}
              url={offer.url}
              addStyles={styles.badge}
            />
          </Grid>
        ))}
        {data.length > 3 && (
          <div className={extraDataToggled ? '' : 'inoHideExtraData'}>
            {data.slice(3).map((offer, index) => (
              <Grid key={index} item xs={12} sm={12}>
                <BadgeRow
                  title={offer.title}
                  mainText={offer.description}
                  icon={EyeIcon}
                  picture={offer.picture}
                  url={offer.url}
                  addStyles={styles.badge}
                  offerData={getOfferMappingData(offer.url)}
                />
              </Grid>
            ))}
          </div>
        )}
        <p className='sourceData'>
          Source de données : <span>Inokufu</span>
        </p>
      </Grid>
    </Accordion>
  );
};

export default InokufuAPI;
