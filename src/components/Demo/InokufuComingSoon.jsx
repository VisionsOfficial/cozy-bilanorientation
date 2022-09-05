import React from 'react';
import Accordion from '../Accordion';

import icon from '../../assets/icons/inokufu.svg';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';

const InokufuComingSoon = () => {
  const { t } = useI18n();

  return (
    <Accordion icon={icon} title={t('formationOffers')}>
      <div style={{ padding: '25px' }}>
        <h5>Bientôt disponible</h5>
      </div>
    </Accordion>
  );
};

export default InokufuComingSoon;
