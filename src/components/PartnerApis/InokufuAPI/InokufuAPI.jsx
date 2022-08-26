import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import { inokufuApiGET } from '../../../utils/remoteDoctypes';
import Accordion from '../../Accordion';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import BadgeRow from '../../Badge/BadgeRow';
import Loader from '../../Loader';

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
      {error && (
        <div>Une erreur est survenue lors du chargement des données</div>
      )}
      {loading ? (
        <Loader
          text={'Veuillez patienter, nous récupérons les offres adaptées...'}
        />
      ) : (
        <Grid className='containerBadgeRow'>
          {data.slice(0, 2).map((offer, index) => (
            <Grid key={index} item>
              <BadgeRow
                offerAPI={offer}
                icon={EyeIcon}
                addStyles={styles.badge}
                offerDataMapping={getOfferMappingData(offer.url)}
              />
            </Grid>
          ))}
          {data.length > 2 &&
            data.slice(2, 8).map((offer, index) => (
              <div key={index}>
                <Grid
                  item
                  className={
                    extraDataToggled ? 'carouselData' : 'inoHideExtraData'
                  }
                >
                  <BadgeRow
                    offerAPI={offer}
                    icon={EyeIcon}
                    addStyles={styles.badge}
                    offerDataMapping={getOfferMappingData(offer.url)}
                  />
                </Grid>
              </div>
            ))}
          <p className='sourceData'>
            Source de données : <span>Inokufu</span>
          </p>
        </Grid>
      )}
    </Accordion>
  );
};

export default InokufuAPI;
