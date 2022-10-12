import Icon from 'cozy-ui/transpiled/react/Icon';
import React from 'react';
import { useJsonFiles } from '../Hooks/useJsonFiles';
import { useClient } from 'cozy-client';

import Arrow from '../../assets/icons/arrow-right-solid.svg';
import { saveJSONFilesToVisionsCozyDoctype } from '../../utils/saveDataToVisionsCozyDoctype';
import { createPublicShareCode } from '../../utils/visions.cozy';
import { useState } from 'react';
import Loader from '../Loader';
import log from 'cozy-logger';

const ShareBilanBtn = ({
  absolute = false,
  onClickFc,
  textContent = 'Partager mon bilan'
}) => {
  const client = useClient();
  const { jsonFiles } = useJsonFiles();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    const awaitSetTimeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    let doc = undefined;
    try {
      doc = await saveJSONFilesToVisionsCozyDoctype(client, jsonFiles);
    } catch (err) {
      // There could be a document save conflict if fired before the offers are loaded in
      log('warn', 'Document save conflict situation.');
      await awaitSetTimeout(8000);
      try {
        doc = await saveJSONFilesToVisionsCozyDoctype(client, jsonFiles);
      } catch (err) {
        log('error', err);
        alert('Une erreur est survenue, veuillez réessayer plus tard.');
        setLoading(false);
        return;
      }
    }
    const publicShareCode = await createPublicShareCode(client, doc);
    const publicUrl = `${location.protocol}//${location.host}/public/?sharecode=${publicShareCode}`;
    sessionStorage.setItem('pubshare', publicUrl);

    onClickFc();
    setLoading(false);
  };

  return (
    <div
      style={{
        position: absolute ? 'absolute' : null,
        top: absolute ? 50 : null,
        right: absolute ? 30 : null
      }}
      className='btnShare'
      onClick={() => handleClick()}
    >
      {loading ? (
        <Loader text={'Préparation du partage...'} size={25} />
      ) : (
        <>
          <p className='btnText'>{textContent}</p>
          <div className='btnCircle'>
            <Icon icon={Arrow} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShareBilanBtn;
