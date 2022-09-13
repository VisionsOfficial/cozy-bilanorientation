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
// import { saveAPIDataToVisionsCozyDoctype } from '../../../utils/saveDataToVisionsCozyDoctype';
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
  isPublicPage = false,
  isTension
}) => {
  const client = useClient();
  const { t } = useI18n();

  const { mappingData, dataStatus } = useMappingData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);

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
    let isMounted = true;
    const getData = async () => {
      const usedJobCards = isTension
        ? jobCards.filter(jc => jc.isTension && jc.isTension === true)
        : jobCards;

      const usedKeywords = usedJobCards.map(jc => jc.name);
      if (!usedKeywords.length) return;

      // TMP
      // if (sessionStorage.getItem('inokufuApi') && isMounted) {
      //   setLoading(false);
      //   setData(JSON.parse(sessionStorage.getItem('inokufuApi')));
      //   return;
      // }

      // Call to wakeup the API
      await inokufuApiPOST(client, {
        project: 'reo',
        inputKeyword: usedKeywords[0]
      });

      // Prepare calls to retrieve output keywords for every input keyword
      // there is. The output keywords are then used to get the offers
      const retrieveOutputKeywordsPromises = [];

      for (const keyword of usedKeywords) {
        retrieveOutputKeywordsPromises.push(
          inokufuApiPOST(client, {
            project: 'reo',
            inputKeyword: keyword.toLowerCase().trim()
          })
        );
      }

      const outputKeywordsPromiseResults = await Promise.all(
        retrieveOutputKeywordsPromises
      );

      // Match input keywords to output keywords results to build out the sections
      // in the UI
      const matchInKeyToOutKey = results => {
        const match = {};
        // Loop over the usedKeywords as it will be same length as the promise array we built
        for (let i = 0; i < usedKeywords.length; i++) {
          let apiResult = results[i];

          if (typeof apiResult === 'string') apiResult = JSON.parse(apiResult);

          match[usedKeywords[i]] = apiResult;
        }

        return match;
      };

      const match = matchInKeyToOutKey(outputKeywordsPromiseResults);

      const retrieveOffersPromises = [];
      for (const inputKeyword in match) {
        if (match[inputKeyword].statusCode === 400) {
          retrieveOffersPromises.push({});
        } else {
          const outputKeywords = match[inputKeyword].response.outputKeywords;
          // TODO : Loop through keywords and associate this inputKw to the multiple get calls;
          retrieveOffersPromises.push(
            inokufuApiGET(client, {
              provider,
              keywords: outputKeywords.join(',')
            })
          );
        }
      }

      const offersPromisesResults = await Promise.all(retrieveOffersPromises);

      // Store seen and duplicate results to build sections in the UI
      const seenResults = [];
      const duplicateResults = [];
      const sections = [];
      for (let i = 0; i < usedKeywords.length; i++) {
        const get = offersPromisesResults[i];

        if (get?.response?.content) {
          // Push results in seen array
          seenResults.push(...get.response.content);
          if (i !== 0) {
            // For each offer verify if it has already been seen and push in duplicates if necessary
            for (const receivedOffer of get.response.content) {
              if (seenResults.find(o => o.title === receivedOffer.title)) {
                duplicateResults.push(receivedOffer);
              }
            }
          }
        }

        const keyword = usedKeywords[i];

        const filterDupes = arr => {
          const filtered = [];
          for (const el of arr) {
            const foundDupe = duplicateResults.find(o => o.title === el.title);
            if (!foundDupe) {
              filtered.push(el);
            }
          }
          return filtered;
        };

        const hasDupes = arr => {
          for (const el of arr) {
            if (duplicateResults.find(o => o.title === el.title)) return true;
          }
          return false;
        };

        const getDupes = arr => {
          const dupes = [];
          for (const el of arr) {
            const foundDupe = duplicateResults.find(o => o.title === el.title);
            if (foundDupe) dupes.push(foundDupe);
          }

          return dupes;
        };

        const content = get?.response?.content || [];

        // if first iteration push normally
        // else only push if not a duplicate
        if (i === 0) {
          sections.push({
            title: keyword,
            offers: content,
            hasDupes: false,
            dupes: []
          });
        } else {
          sections.push({
            title: keyword,
            offers: filterDupes(content),
            hasDupes: hasDupes(content),
            dupes: getDupes(content)
          });
        }
      }

      if (!isMounted) return;

      setLoading(false);
      setData(sections);

      // TMP
      // sessionStorage.setItem('inokufuApi', JSON.stringify(sections));

      // await saveAPIDataToVisionsCozyDoctype(client, 'inokufu', sections);
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [client, provider, jobCards, isTension]);

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
      // btnSeeMore={data.length > 2}
      btnSeeMore={false}
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
                <h4>Vos offres pour : {section.title}</h4>
                {section.hasDupes && (
                  <>
                    <p>
                      Certaines formations pour ce métier vous ont été proposées
                      pour un autre métier ci-dessus.
                    </p>
                    <ul>
                      {/* {section.dupes.map((o, wIdx) => (
                        <li key={wIdx}>{o.title}</li>
                      ))} */}
                      {section.dupes.map((o, wIdx) => (
                        <Grid key={wIdx} item>
                          <BadgeRow
                            offerAPI={o}
                            icon={EyeIcon}
                            addStyles={styles.badge}
                            offerDataMapping={getOfferMappingData(o?.publisher)}
                            isPublicPage={isPublicPage}
                          />
                        </Grid>
                      ))}
                    </ul>
                  </>
                )}
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
                {section.offers.length === 0 && section.dupes.length === 0 && (
                  <p>Aucune offre trouvée</p>
                )}
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

export default InokufuAPI;
