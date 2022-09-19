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
import { useCallback } from 'react';
import { waitForRepeatingFunctionsToEnd } from '../../../utils/utils';

const TIME_BETWEEN_QUERIES = 10 * 60 * 1000;

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

const InokufuAPIReo = ({
  provider = 'visions',
  isPublicPage = false,
  isTension = false,
  project = 'reo'
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
      if (sessionStorage.getItem(SESSION_INOKUFU_LAST_CALL + 'reo')) {
        const lastCall = JSON.parse(
          sessionStorage.getItem(SESSION_INOKUFU_LAST_CALL + 'reo')
        );
        if (Date.now() - lastCall < TIME_BETWEEN_QUERIES) {
          if (
            sessionStorage.getItem(SESSION_INOKUFU_DATA + 'reo') &&
            isMounted
          ) {
            setLoading(false);
            setData(
              JSON.parse(sessionStorage.getItem(SESSION_INOKUFU_DATA + 'reo'))
            );
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

        const thisInputKeywordPromises = [];
        for (const k of outputKeywords) {
          thisInputKeywordPromises.push(
            inokufuApiGET(client, {
              provider,
              keywords: k
            })
          );
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
          offers: matchWithoutDuplicates[key].offers
        });
      }

      if (!isMounted) return;

      setLoading(false);
      setData(sections);

      for (const s of sections) {
        for (const o of s.offers) {
          const pub = o.publisher
            ? o.publisher[0]?.name || 'UNKNOWN_PUBLISHER'
            : 'UNKNOWN_PUBLISHER';
          storeLeadView(pub);
        }
      }

      sessionStorage.setItem(
        SESSION_INOKUFU_DATA + 'reo',
        JSON.stringify(sections)
      );
      sessionStorage.setItem(
        SESSION_INOKUFU_LAST_CALL + 'reo',
        JSON.stringify(Date.now())
      );

      await saveAPIDataToVisionsCozyDoctype(client, 'inokufu-reo', sections);
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
                {section?.offers?.length === 0 ? (
                  <h4>Aucune offre trouvée pour {section.title}</h4>
                ) : (
                  <h4>Vos offres pour : {section.title}</h4>
                )}
                {section.offers.map((offer, yndex) => (
                  <Grid key={yndex} item>
                    <BadgeRow
                      offerAPI={offer}
                      icon={EyeIcon}
                      addStyles={styles.badge}
                      offerMethodMapping={getOFMethodMapping(
                        offer.publisher[0]?.name || ''
                      )}
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

export default InokufuAPIReo;
