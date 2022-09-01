import React, { useRef, useState } from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';

import Accordion from '../../Accordion';
import CurioseIcon from '../../../assets/icons/curiose.svg';
import { useJsonFiles } from '../../Hooks/useJsonFiles';
import BadgePersonality from '../../Badge/BadgePersonality';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

const validCodes = ['testing123', 'code2'];

const Curiose = ({ title, headerBg, addStyles }) => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.curiose?.data || [];

  const [revealData, setRevealData] = useState(false);
  const codeInputRef = useRef(null);

  const verifyCode = () => {
    if (!codeInputRef) return;
    const code = codeInputRef.current.value;
    if (validCodes.includes(code)) setRevealData(true);
    else alert('Code invalide');
  };

  return (
    <Accordion
      icon={CurioseIcon}
      title={t(title)}
      bgHeader={headerBg}
      addStyles={addStyles}
    >
      <div style={{ padding: '25px', width: '100%' }}>
        {revealData ? (
          <Grid className='u-mv-1' container spacing={2}>
            <Grid item xs={12} sm={12} lg={6} xl={4}>
              <BadgePersonality />
              <p className='sourceData'>
                Source de données : <span>Curiose.</span>
              </p>
            </Grid>
          </Grid>
        ) : (
          <div className='codeContainer'>
            <div className='codeInput'>
              <label htmlFor='code'>
                Entrez votre code Curiose pour visualiser vos données.
              </label>
              <input type='text' name='code' id='code' ref={codeInputRef} />
            </div>
            <button onClick={verifyCode}>Entrer</button>
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default Curiose;
