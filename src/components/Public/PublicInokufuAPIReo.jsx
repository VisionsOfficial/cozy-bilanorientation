import React from 'react';

import Accordion from '../Accordion';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import BadgeRow from '../Badge/BadgeRow';

// IMG
import icon from '../../assets/icons/inokufu.svg';
import EyeIcon from '../../assets/icons/icon-eye.svg';
import cyLogo from '../../assets/images/cy.png';

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

const PublicInokufuAPIReo = ({ data, isPublicPage = true }) => {
  const { t } = useI18n();

  if (!data?.length) return null;

  return (
    <Accordion
      icon={icon}
      title={t('offers.reo')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
      btnSeeMore={false}
      seeMoreFC={() => {}}
      seeMoreToggled={false}
    >
      <Grid>
        {data.map((section, index) => (
          <Grid key={index} xs={12} className='containerBadgeRow' item>
            <div>
              {section?.offers?.length === 0 ? (
                <h4>Aucune offre recommandée pour {section.title}</h4>
              ) : (
                <h4>Offres recommandées pour : {section.title}</h4>
              )}
              {section.offers.map((offer, yndex) => (
                <Grid key={yndex} item>
                  <BadgeRow
                    offerAPI={offer}
                    fixedPicture={cyLogo}
                    icon={EyeIcon}
                    addStyles={styles.badge}
                    offerMethodMapping={null}
                    offerDataMapping={null}
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
    </Accordion>
  );
};

export default PublicInokufuAPIReo;
