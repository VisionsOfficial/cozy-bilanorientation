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
import { useMappingData } from '../../Hooks/useMappingData';

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

const DEMO_DATA = [
  {
    title: 'Anglais En Ligne',
    url:
      'https://formation.neobridge.com/langues/anglais-hypnose-toeic/#contact--eligi_form',
    description:
      'Apprenez facilement l&apos;anglais. Gr\u00e2ce \u00e0 l\u2019apprentissage sous hypnose, levez vos freins et vos \u00e9motions limitantes pour un apprentissage optimal. Choisissez votre formateur pour profitez de face \u00e0 face en visio et d\u2019une formation en ligne \u00e0 visage humain. Obtenez une certification TOEIC reconnue dans le monde du travail. Notre objectif, que vous vous exprimiez avec envie, confiance et s\u00e9r\u00e9nit\u00e9. Plus d&apos;infos : https://formation.neobridge.com/assets/docs/anglais-toeic.pdf'
  },
  {
    title: 'Prospecter et développer un portefeuille client',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83854281900027_788/83854281900027_782',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/5moncompteformation.png',
    description:
      "La formation « Prospection et développement d'un portefeuille client » vous permet d'accompagner vos clients et définir les actions qui peuvent apporter un avantage concurrentiel à l'entreprise . Le programme s'articule autour de 3 axes : 1. Comment et pourquoi se former à la prospection et au dével..."
  },
  {
    title: 'Anglais',
    url: 'https://lp.wallstreetenglish.fr/vision',
    description:
      'Accédez à la Méthode Wall Street English et aux cœurs des éléments qui la composent. Notre formation intensive en anglais est la formation d’apprentissage de l’anglais qu’il vous faut pour améliorer votre anglais rapidement quel que soit votre niveau actuel en suivant un rythme hebdomadaire soutenu. La formation English Express peut être suivie à distance en petit groupe (24h/24) et/ou en centre.',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/9moncompteformation.png'
  }
];

const InokufuAPI = ({
  provider = 'visions',
  keywords,
  isPublicPage = false
}) => {
  const client = useClient();
  const { t } = useI18n();
  const { mappingData, dataStatus } = useMappingData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [extraDataToggled, setExtraDataToggled] = useState(false);

  const getOfferMappingData = url => {
    if (!mappingData) return null;
    const idx = mappingData?.of?.findIndex(o => o['lien redirection'] === url);
    if (idx === -1) {
      // Try find with other link
      const idxInfo = mappingData?.of?.findIndex(
        o => o['lien information'] === url
      );
      if (idxInfo === -1) return null;
      else return mappingData.of[idxInfo];
    }

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
        // const content = res.response.content;
        setData(DEMO_DATA);
        setLoading(false);
        setError(false);
      }
    };

    getData();
  }, [client, keywords, provider]);

  const toggleViewMore = () => {
    setExtraDataToggled(!extraDataToggled);
  };

  if (!dataStatus.isLoaded && dataStatus.isLoading) {
    return <Loader text='Chargement' />;
  } else if (!dataStatus.isLoaded && !dataStatus.isLoading) {
    return <div>Une erreur est survenue</div>;
  }

  return (
    <Accordion
      icon={icon}
      title={t('formationOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
      btnSeeMore={data.length > 2}
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
                isPublicPage={isPublicPage}
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
                    isPublicPage={isPublicPage}
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
