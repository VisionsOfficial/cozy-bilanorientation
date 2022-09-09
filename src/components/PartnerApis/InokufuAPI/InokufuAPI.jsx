import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import { inokufuApiGET, inokufuApiPOST } from '../../../utils/remoteDoctypes';
import Accordion from '../../Accordion';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import BadgeRow from '../../Badge/BadgeRow';
import Loader from '../../Loader';

// IMG
import icon from '../../../assets/icons/inokufu.svg';
import EyeIcon from '../../../assets/icons/icon-eye.svg';
import { useMappingData } from '../../Hooks/useMappingData';
import { saveAPIDataToVisionsCozyDoctype } from '../../../utils/saveDataToVisionsCozyDoctype';
import { useJsonFiles } from '../../Hooks/useJsonFiles';

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

  const { jsonFiles } = useJsonFiles();
  const jobCards = jsonFiles.orientoi?.data?.data?.jobCards || [];

  const getOfferMappingData = publisherArr => {
    if (!publisherArr || !publisherArr.length || !mappingData) return null;

    const publisherName = publisherArr[0].name;
    const idx = mappingData?.of?.findIndex(
      o => o.OF.toLowerCase().trim() === publisherName.toLowerCase().trim()
    );
    if (idx === -1) return null;
    return mappingData.of[idx];
  };

  useEffect(() => {
    const getData = async () => {
      const tensionJobCards = jobCards.filter(
        jc => jc.isTension && jc.isTension === true
      );
      const tensionKeywords = tensionJobCards.map(jc => jc.name);
      if (!tensionKeywords.length) return;

      // TMP
      if (sessionStorage.getItem('inokufuApi')) {
        setLoading(false);
        setData(JSON.parse(sessionStorage.getItem('inokufuApi')));
        return;
      }

      // Call to wakeup the API
      await inokufuApiPOST(client, {
        project: 'reo',
        inputKeyword: tensionKeywords[0]
      });

      const postPromises = [];

      for (const keyword of tensionKeywords) {
        postPromises.push(
          inokufuApiPOST(client, {
            project: 'reo',
            inputKeyword: keyword.toLowerCase().trim()
          })
        );
      }

      const postResults = await Promise.all(postPromises);

      const matchResultsToKeywords = results => {
        const match = {};
        for (let i = 0; i < tensionKeywords.length; i++) {
          let apiResult = results[i];

          if (typeof apiResult === 'string') apiResult = JSON.parse(apiResult);

          match[tensionKeywords[i]] = apiResult;
        }

        return match;
      };

      const tensionToApiResults = matchResultsToKeywords(postResults);

      const getPromises = [];
      for (const met in tensionToApiResults) {
        if (tensionToApiResults[met].statusCode === 400) {
          getPromises.push({});
        } else {
          getPromises.push(inokufuApiGET(client, { provider, keywords }));
        }
      }

      const getResults = await Promise.all(getPromises);

      const sections = [];
      for (let i = 0; i < tensionKeywords.length; i++) {
        const get = getResults[i];
        const keyword = tensionKeywords[i];
        sections.push({
          title: keyword,
          offers: get?.response?.content || []
        });
      }

      setLoading(false);
      setData(sections);

      // TMP
      sessionStorage.setItem('inokufuApi', JSON.stringify(sections));

      // await saveAPIDataToVisionsCozyDoctype(client, 'inokufu', sections);
    };

    getData();
  }, [client, keywords, provider, jobCards]);

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
        <Grid>
          {data.map((section, index) => (
            <Grid key={index} xs={12} className='containerBadgeRow' item>
              <div>
                <p>Vos offres pour : {section.title}</p>
                {section.offers.map((offer, yndex) => (
                  <Grid key={yndex} item>
                    <BadgeRow
                      offerAPI={offer}
                      icon={EyeIcon}
                      addStyles={styles.badge}
                      offerDataMapping={getOfferMappingData(offer?.publisher)}
                      isPublicPage={isPublicPage}
                    />
                  </Grid>
                ))}
              </div>
              <p className='sourceData'>
                Source de données : <span>Inokufu</span>
              </p>
            </Grid>
          ))}
        </Grid>
      )}
    </Accordion>
  );
};

export const DEMO_DATA = [
  {
    title: 'Anglais',
    url: 'https://lp.wallstreetenglish.fr/vision',
    description:
      'Accédez à la Méthode Wall Street English et aux cœurs des éléments qui la composent. Notre formation intensive en anglais est la formation d’apprentissage de l’anglais qu’il vous faut pour améliorer votre anglais rapidement quel que soit votre niveau actuel en suivant un rythme hebdomadaire soutenu. La formation English Express peut être suivie à distance en petit groupe (24h/24) et/ou en centre.',
    picture:
      'https://visionspol.eu/wp-content/uploads/2022/09/LOGO-Wall-street-english.jpg'
  },
  {
    title: 'Anglais En Ligne',
    url:
      'https://formation.neobridge.com/langues/anglais-hypnose-toeic/#contact--eligi_form',
    description:
      'Apprenez facilement l&apos;anglais. Gr\u00e2ce \u00e0 l\u2019apprentissage sous hypnose, levez vos freins et vos \u00e9motions limitantes pour un apprentissage optimal. Choisissez votre formateur pour profitez de face \u00e0 face en visio et d\u2019une formation en ligne \u00e0 visage humain. Obtenez une certification TOEIC reconnue dans le monde du travail. Notre objectif, que vous vous exprimiez avec envie, confiance et s\u00e9r\u00e9nit\u00e9. Plus d&apos;infos : https://formation.neobridge.com/assets/docs/anglais-toeic.pdf',
    picture:
      'http://visionspol.eu/wp-content/uploads/2022/09/LOGO-NEOBRIDGE.jpg'
  },
  {
    title: 'Prospecter et développer un portefeuille client',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/83854281900027_788/83854281900027_782',
    picture: 'http://visionspol.eu/wp-content/uploads/2022/09/LOGO-studi.jpg',
    description:
      "La formation « Prospection et développement d'un portefeuille client » vous permet d'accompagner vos clients et définir les actions qui peuvent apporter un avantage concurrentiel à l'entreprise . Le programme s'articule autour de 3 axes : 1. Comment et pourquoi se former à la prospection et au dével..."
  }
];

export default InokufuAPI;
