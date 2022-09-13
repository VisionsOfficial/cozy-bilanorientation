import React, { useState } from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

import Accordion from '../../Accordion';
import JobReadyIcon from '../../../assets/icons/jobready.svg';
import LockIcon from 'cozy-ui/transpiled/react/Icons/Lock';
import Icon from 'cozy-ui/transpiled/react/Icon';
import ImportDocumentBtn from '../../Button/ImportDocumentBtn';
import Badge from '../../Badge';
import { useJsonFiles } from '../../Hooks/useJsonFiles';
import iconIdea from '../../../assets/icons/icon-JR-soft-skills.svg';

const styles = {
  badge: {
    background: '#f3f4f6',
    borderRadius: 10,
    padding: '10px 5px'
  }
};

const JobReady = ({ headerBg, addStyles, title }) => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.jobready.data?.data?.[0]?.fields || [];
  const [submit, setSubmit] = useState(false);

  return (
    <Accordion
      icon={JobReadyIcon}
      title={t(title)}
      addStyles={addStyles}
      bgHeader={headerBg}
    >
      <Grid className='u-mv-1' container spacing={2}>
        {submit ? (
          <>
            {datas.length !== 0 &&
              datas.map(({ context: contexts, level, skill }, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={4}
                  style={{ paddingBottom: 30 }}
                >
                  <Badge
                    title={skill.name || ''}
                    mainText={t('context') + ` : ${contexts.join(', ')}`}
                    subText={t('level') + ` : ${level}`}
                    icon={iconIdea}
                    addStyles={styles.badge}
                  />
                </Grid>
              ))}
            <p className='sourceData'>
              Source de données : <span>Jobready</span>
            </p>
          </>
        ) : (
          <div className='importCVContainer'>
            <Icon icon={LockIcon} />
            <p className='importCV'>
              Importez <span>votre lettre de motivation ou CV</span> pour
              découvrir les <span>softskills qui en ressortent</span>
            </p>
            <ImportDocumentBtn submit={setSubmit} />
            <p className='sourceData'>
              Source de données : <span>Jobready</span>
            </p>
          </div>
        )}
      </Grid>
    </Accordion>
  );
};

export default JobReady;
