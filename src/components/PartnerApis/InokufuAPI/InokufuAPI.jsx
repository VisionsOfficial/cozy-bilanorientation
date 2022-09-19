import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import {
  inokufuApiGET,
  inokufuApiPOST,
  visionsTrustApiPOST
} from '../../../utils/remoteDoctypes';
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
import { shuffleArray } from '../../../utils/arrayFunctions';
import { waitForRepeatingFunctionsToEnd } from '../../../utils/utils';
import { useCallback } from 'react';

const TIME_BETWEEN_QUERIES = 10 * 60 * 1000;
const BASE_SHOW_COUNT = 2;

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
  isTension,
  project = 'smartskills'
}) => {
  const client = useClient();
  const { t } = useI18n();

  const { mappingData, dataStatus } = useMappingData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);

  // View more logic
  const [sectionViewedCount, setSectionViewedCount] = useState(null);

  const { jsonFiles } = useJsonFiles();
  const jobCards = jsonFiles.orientoi?.data?.data?.jobCards || [];

  const SESSION_INOKUFU_DATA = 'inokufuApi' + provider;
  const SESSION_INOKUFU_LAST_CALL = 'inokufuLastCall' + provider;

  const getOfferMappingData = publisherArr => {
    if (!publisherArr || !publisherArr.length || !mappingData) return null;

    const publisherName = publisherArr[0].name;
    const idx = mappingData?.of?.findIndex(
      o => o.OF.toLowerCase().trim() === publisherName.toLowerCase().trim()
    );
    if (idx === -1) return null;
    return mappingData.of[idx];
  };

  /**
   * Stores in VisionsTrust when a lead is shown on the page
   * @param {string} of OF name
   */
  const storeLeadView = useCallback(
    async of => {
      const sessionStorageKey = 'ofs';
      if (!sessionStorage.getItem(sessionStorageKey))
        sessionStorage.setItem(sessionStorageKey, JSON.stringify({}));

      let v = JSON.parse(sessionStorage.getItem(sessionStorageKey));
      if (v[of]) {
        v[of]++;
      } else {
        v[of] = 1;
      }
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(v));

      waitForRepeatingFunctionsToEnd(async () => {
        const leads = JSON.parse(sessionStorage.getItem(sessionStorageKey));
        await visionsTrustApiPOST(client, 'leadview', { leads });
        sessionStorage.removeItem(sessionStorageKey);
      }, 500);
    },
    [client]
  );

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      // VIEW MORE LOGIC
      const buildSectionViewCount = sectionsArr => {
        const r = {};
        for (const s of sectionsArr) {
          r[s.title] = {
            offers: [...s.offers],
            title: s.title,
            viewCount: BASE_SHOW_COUNT
          };
        }

        // STORE INITIAL LEADS
        for (const key in r) {
          for (let i = 0; i < BASE_SHOW_COUNT; i++) {
            if (i >= r[key].offers.length) break;
            const publisher =
              r[key]?.offers[i]?.publisher[0]?.name || 'UNKNOWN_PUBLISHER';
            storeLeadView(publisher);
          }
        }

        setSectionViewedCount(prev => ({
          ...prev,
          ...r
        }));
      };

      const usedJobCards = isTension
        ? jobCards.filter(jc => jc.isTension && jc.isTension === true)
        : jobCards.filter(jc => !jc.isTension);

      if (!usedJobCards || !usedJobCards.length) {
        setLoading(false);
        return;
      }

      const usedKeywords = usedJobCards.map(jc => jc.name);
      if (!usedKeywords.length) return;

      // Check session storage and when was last call to avoid too many calls
      if (sessionStorage.getItem(SESSION_INOKUFU_LAST_CALL)) {
        const lastCall = JSON.parse(
          sessionStorage.getItem(SESSION_INOKUFU_LAST_CALL)
        );
        if (Date.now() - lastCall < TIME_BETWEEN_QUERIES) {
          if (sessionStorage.getItem(SESSION_INOKUFU_DATA) && isMounted) {
            setData(JSON.parse(sessionStorage.getItem(SESSION_INOKUFU_DATA)));
            buildSectionViewCount(
              JSON.parse(sessionStorage.getItem(SESSION_INOKUFU_DATA))
            );
            setLoading(false);
            return;
          }
        }
      }

      // Call to wakeup the API
      await inokufuApiPOST(client, {
        project,
        inputKeyword: usedKeywords[0]
      });

      // Prepare calls to retrieve output keywords for every input keyword
      // there is. The output keywords are then used to get the offers
      const retrieveOutputKeywordsPromises = [];

      for (const keyword of usedKeywords) {
        retrieveOutputKeywordsPromises.push(
          inokufuApiPOST(client, {
            project,
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

      const removeDuplicateKwFromMatch = obj => {
        const seenKeywords = [];
        const r = {};
        for (const [key, apiRes] of Object.entries(obj)) {
          if (apiRes.statusCode !== 200 && apiRes.statusCode !== 210) {
            r[key] = apiRes;
            continue;
          }

          if (seenKeywords.length === 0) {
            seenKeywords.push(...apiRes.response.outputKeywords);
            r[key] = apiRes;
            continue;
          }

          const newKwArr = [];
          for (const kw of apiRes.response.outputKeywords) {
            if (!seenKeywords.includes(kw)) newKwArr.push(kw);
          }
          apiRes.response.outputKeywords = newKwArr;
          r[key] = apiRes;
        }
        return r;
      };

      const matchWithoutDuplicates = removeDuplicateKwFromMatch(match);

      for (const inputKeyword in matchWithoutDuplicates) {
        if (matchWithoutDuplicates[inputKeyword].statusCode === 400) {
          matchWithoutDuplicates[inputKeyword].offers = [];
          continue;
        }
        const outputKeywords =
          matchWithoutDuplicates[inputKeyword].response.outputKeywords;
        const queryParams =
          matchWithoutDuplicates[inputKeyword].response.queryParameters;

        const thisInputKeywordPromises = [];
        for (const url of queryParams) {
          const u = new URL(url);
          const searchParams = u.searchParams;
          const dynProvider = searchParams.get('provider');
          const dynPublisher = searchParams.get('publisher');
          const extraQueryString = `&publisher=${dynPublisher}`;

          for (const k of outputKeywords) {
            thisInputKeywordPromises.push(
              inokufuApiGET(
                client,
                {
                  dynProvider,
                  keywords: k
                },
                extraQueryString
              )
            );
          }
        }

        const thisInKwOffersResponses = await Promise.all(
          thisInputKeywordPromises
        );
        const thisInKwOffers = [];
        for (const r of thisInKwOffersResponses) {
          if (r.statusCode !== 200) continue;
          for (const offer of r.response.content) {
            if (thisInKwOffers.find(o => o.title === offer.title)) continue;
            thisInKwOffers.push(offer);
          }
        }

        matchWithoutDuplicates[inputKeyword].offers = thisInKwOffers;
      }

      const sections = [];
      for (const key in matchWithoutDuplicates) {
        sections.push({
          title: key,
          offers: shuffleArray(matchWithoutDuplicates[key].offers)
        });
      }

      if (!isMounted) return;

      buildSectionViewCount(sections);
      setData(sections);
      setLoading(false);

      sessionStorage.setItem(SESSION_INOKUFU_DATA, JSON.stringify(sections));
      sessionStorage.setItem(
        SESSION_INOKUFU_LAST_CALL,
        JSON.stringify(Date.now())
      );

      await saveAPIDataToVisionsCozyDoctype(
        client,
        'inokufu-smartskills',
        sections
      );
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [
    client,
    provider,
    jobCards,
    isTension,
    project,
    SESSION_INOKUFU_DATA,
    SESSION_INOKUFU_LAST_CALL,
    storeLeadView
  ]);

  /**
   * Augments the allowed offers to appear
   * @param {string} sectionTitle The name of the job - section title
   * @param {string} of The name of the of
   */
  const viewMore = sectionTitle => {
    for (
      let i = sectionViewedCount[sectionTitle].viewCount;
      i < sectionViewedCount[sectionTitle].viewCount + BASE_SHOW_COUNT;
      i++
    ) {
      if (i >= sectionViewedCount[sectionTitle].offers.length) break;
      const publisher =
        sectionViewedCount[sectionTitle]?.offers[i]?.publisher[0]?.name ||
        'UNKNOWN_PUBLISHER';

      storeLeadView(publisher);
    }

    setSectionViewedCount(prev => ({
      ...prev,
      [sectionTitle]: {
        ...prev[sectionTitle],
        viewCount: prev[sectionTitle].viewCount + BASE_SHOW_COUNT
      }
    }));
  };

  /**
   * Finds the method for the of with email if necessary
   * @param {string} of Name of the OF
   * @returns The mapping for this of
   */
  const getOFMethodMapping = of => {
    const map = mappingData.methods.find(
      o => o.OF === of.toLowerCase().replaceAll(' ', '_')
    );
    return map;
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
      btnSeeMore={false}
      seeMoreFC={() => {}}
      seeMoreToggled={false}
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
                {section?.offers?.length === 0 ? (
                  <h4>Aucune offre trouvée pour {section.title}</h4>
                ) : (
                  <h4>Vos offres pour : {section.title}</h4>
                )}
                {section.offers.map((offer, yndex) => {
                  if (
                    yndex <
                    (sectionViewedCount[section.title]?.viewCount ||
                      BASE_SHOW_COUNT)
                  ) {
                    return (
                      <Grid key={yndex} item>
                        <BadgeRow
                          offerAPI={offer}
                          icon={EyeIcon}
                          addStyles={styles.badge}
                          offerMethodMapping={getOFMethodMapping(
                            offer.publisher[0]?.name || ''
                          )}
                          offerDataMapping={getOfferMappingData(
                            offer?.publisher
                          )}
                          isPublicPage={isPublicPage}
                        />
                      </Grid>
                    );
                  }
                })}
                {section.offers.length >
                  (sectionViewedCount[section.title]?.viewCount ||
                    BASE_SHOW_COUNT) && (
                  <div
                    className='btnShare'
                    onClick={() => {
                      viewMore(section.title);
                    }}
                    style={{ marginTop: '10px' }}
                  >
                    <p className='btnText'>Voir +</p>
                  </div>
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
