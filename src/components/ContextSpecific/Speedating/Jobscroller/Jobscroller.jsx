import React from 'react';
import { useEffect, useState } from 'react';
import { useClient } from 'cozy-client';
import { visionsTrustApiPOST } from '../../../../utils/remoteDoctypes';
import Loader from '../../../Loader';
import Accordion from '../../../Accordion';
import Arrow from '../../../../assets/icons/arrow-right-solid.svg';
import icon from '../../../../assets/icons/inokufu.svg';
import logoTmp from '../../../../assets/icons/icon-check.svg';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import { Typography } from '@material-ui/core';
import { useJsonFiles } from '../../../Hooks/useJsonFiles';
import ShareBilanBtn from '../../../Button/ShareBilanBtn';
import { prioritizeCards } from '../../../../utils/orientoi';

const TMP_REDIRECTION_LINK =
  'https://visionspol.eu/speedating-de-la-formation-aux-metiers-du-numerique/';

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

const Jobscroller = () => {
  const client = useClient();
  const { t } = useI18n();

  const { jsonFiles } = useJsonFiles();
  const jobCards = jsonFiles.orientoi?.data?.data?.jobCards || [];

  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');

  const openModal = link => {
    setRedirectLink(link);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (!jobCards?.length) return;
    if (!client) return;
    const getOffers = async () => {
      const data = await visionsTrustApiPOST(client, 'speedating');
      const offers = data.offers || [];

      const result = [];
      for (const jc of prioritizeCards(jobCards)) {
        const tmp = {
          job: jc.name.toUpperCase(),
          offers: offers.filter(
            o => o.SECTEUR.toLowerCase().trim() === jc.name.toLowerCase().trim()
          )
        };
        result.push(tmp);
      }

      setSections(result);
      setIsLoading(false);
    };

    getOffers();
  }, [client, jobCards]);

  if (isLoading) {
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
        <Loader text='Veuillez patienter, nous récupérons les offres...' />
      </Accordion>
    );
  }

  return (
    <>
      <Accordion
        icon={icon}
        title={t('formationOffers')}
        addStyles={styles.card}
        bgHeader={'#FFF'}
        btnSeeMore={false}
        seeMoreFC={() => {}}
        seeMoreToggled={false}
      >
        <Grid>
          {sections.map(({ job, offers }, index) => (
            <Grid key={index} xs={12} className='containerBadgeRow' item>
              <div>
                {offers?.length === 0 ? (
                  <h4>Aucune offre trouvée pour {job}</h4>
                ) : (
                  <>
                    <h4>Vos offres pour {job}</h4>
                    {offers.map(offer => (
                      <Grid key={offer.TITRE} xs={12} item>
                        <div className='badgeRow' style={styles.badge}>
                          <div className='badgeRowTextContainer'>
                            <Typography
                              className='badgeRowTitle'
                              variant='h6'
                              component='div'
                            >
                              {offer.TITRE}
                            </Typography>
                            <Typography className='u-mv-half' variant='body1'>
                              {offer.ENTREPRISE}
                            </Typography>
                            <Typography
                              className='textLineClamp'
                              variant='body1'
                            >
                              {offer.CONTENU}
                            </Typography>
                            <div
                              style={{
                                margin: '10px 0px'
                              }}
                            >
                              <ShareBilanBtn
                                textContent={t('visionsContext.numerique.rdv')}
                                onClickFc={() => openModal(offer.LIEN)}
                              />
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Accordion>
      <Modal
        closeModal={closeModal}
        visible={modalVisible}
        content={t('visionsContext.numerique.pre_jobscroller')}
        link={redirectLink}
      />
    </>
  );
};

const Modal = ({ closeModal, visible, content, link }) => {
  const handleBackdropClick = () => {
    closeModal();
  };

  if (!visible) return <></>;

  return (
    <div
      className={`backdrop ${open ? 'openModal' : ''}`}
      onClick={() => handleBackdropClick()}
    >
      <div
        className='modal'
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className='modalHeader'>
          <div className='modalLogo'>
            <Icon icon={logoTmp} className='modalImg' />
          </div>
          <div className='closeModal' onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className='modalContent'>
          <div>{content}</div>
          <div
            style={{
              margin: '10px 0px'
            }}
          >
            <div
              className='btnShare'
              onClick={() => window.open(TMP_REDIRECTION_LINK)}
            >
              <p className='btnText'>Je prends RDV</p>
              <div className='btnCircle'>
                <Icon icon={Arrow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobscroller;
