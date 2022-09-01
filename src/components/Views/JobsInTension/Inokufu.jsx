import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import Accordion from '../../Accordion';
import icon from '../../../assets/icons/inokufu.svg';

import { useJsonFiles } from '../../Hooks/useJsonFiles';
import GenericButton from '../../Button/GenericButton/GenericButton';

const getLastElements = (arr, x) => arr.slice(Math.max(arr.length - x, 1));

const Inokufu = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = getLastElements(jsonFiles.inokufu.data?.data || [], 3);

  return (
    <Accordion icon={icon} title={t('formationOffers')} bgHeader={'#FFF'}>
      <Grid
        className='u-mv-1'
        container
        spacing={2}
        style={{ paddingBottom: 20, justifyContent: 'center' }}
      >
        {datas.map((data, index) => (
          <Grid key={index} item className='inokufuCard'>
            <div className='inokufuCardPicture'>
              <img src={data.picture} alt='' />
            </div>
            <div className='inokufuCardContent'>
              <p className='inokufuCardContentTitle'>{data.title}</p>
              <p>{data.keywords}</p>
              <GenericButton
                textContent={'En savoir +'}
                onClickFc={() => window.open(data.url)}
                eyeIcon={true}
              />
            </div>
          </Grid>
        ))}
        <p className='sourceData'>
          Source de données : <span>Inokufu</span>
        </p>
      </Grid>
    </Accordion>
  );
};

export default Inokufu;
