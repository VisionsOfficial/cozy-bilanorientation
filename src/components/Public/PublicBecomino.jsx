import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import icon from '../../assets/icons/becomino.svg';
import Accordion from '../Accordion';
import EducationalContent from '../Views/JobExplorationsPage/EducationalContent';

const PublicBecomino = ({ data }) => {
  const { t } = useI18n();

  if (!data?.length) return null;

  return (
    <Accordion icon={icon} title={t('becominoTitle')}>
      <Grid className='u-mv-1 u-ph-1' container spacing={2}>
        {data.map(({ picture, provider, timestamp, title, url }, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <EducationalContent
              date={timestamp}
              keywords={provider}
              picture={picture}
              title={title}
              url={url}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
};

export default PublicBecomino;
