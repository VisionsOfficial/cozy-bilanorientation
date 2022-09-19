import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import InokufuIcon from '../../assets/icons/inokufu.svg';
import Accordion from '../Accordion';
import EducationalContent from '../Views/JobExplorationsPage/EducationalContent';

const getLastElements = (arr, x) => arr.slice(Math.max(arr.length - x, 1));

const PublicEducationalContents = ({ data }) => {
  const { t } = useI18n();
  const datas = getLastElements(data, 4);

  return (
    <Accordion icon={InokufuIcon} title={t('educationalContents')}>
      <Grid className='u-mv-1 u-ph-1' container spacing={2}>
        {datas.length === 0 ? (
          <div style={{ padding: '25px' }}>
            <h5>Données introuvables</h5>
          </div>
        ) : (
          <>
            {datas.map(({ date, keywords, picture, title, url }, index) => (
              <Grid
                key={index}
                item
                xs={12}
                className='inokufuEducationalContent'
                style={{
                  background: '#f3f4f6',
                  borderRadius: 10,
                  margin: 10,
                  maxWidth: 'calc(50% - 30px)'
                }}
              >
                <EducationalContent
                  date={date}
                  keywords={keywords}
                  picture={picture}
                  title={title}
                  url={url}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Accordion>
  );
};

export default PublicEducationalContents;
