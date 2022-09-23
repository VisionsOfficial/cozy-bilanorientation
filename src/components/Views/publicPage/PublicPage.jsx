import React from 'react';
import { useClient } from 'cozy-client';
import ContactInfo from '../../User/ContactInfo';
import getSharedDocument from 'cozy-sharing/dist/getSharedDocument';

import { Content } from 'cozy-ui/transpiled/react/Layout';

import { getParameterByName } from '../../../utils/urlFunctions';
import { useState } from 'react';
import { useEffect } from 'react';
import PublicOrientoiJobExploration from '../../Public/PublicOrientoiJobExploration';
import PublicJobReady from '../../Public/PublicJobready';
import PublicEducationalContents from '../../Public/PublicEducationalContents';
import PublicBecomino from '../../Public/PublicBecomino';
import PublicPitangoo from '../../Public/PublicPitangoo';
import PublicInokufuAPI from '../../Public/PublicInokufuAPI';
import PublicPalmAPI from '../../Public/PublicPalmAPI';
import PublicCuriose from '../../Public/PublicCuriose';

const styles = {
  content: {
    // marginTop: '-55px',
    overflow: 'visible'
  }
};

const PublicPage = () => {
  const shareCode = getParameterByName('sharecode');
  const [document, setDocument] = useState();
  const client = useClient();

  useEffect(() => {
    const getDoc = async () => {
      const sharedDoc = await getSharedDocument(client);
      const doc = await client.collection('visions.cozy').get(sharedDoc);
      setDocument(doc.data);
    };

    getDoc();
  }, [client]);

  if (!shareCode) {
    return <>Une erreur est survenue.</>;
  }

  if (!document) return <>Chargement...</>;

  return (
    <Content style={styles.content} id='main'>
      <ContactInfo userInfo={document} />
      <PublicJobReady
        data={document?.platforms?.jobready?.data?.data?.[0]?.fields || []}
      />
      <PublicOrientoiJobExploration
        title={'JobExplore'}
        badge={true}
        showType={true}
        data={document?.platforms?.orientoi?.data || []}
      />
      {/* <PublicPalm data={document?.platforms?.PALM?.data || []} /> */}
      <PublicOrientoiJobExploration
        title={'myTalent'}
        talent={true}
        data={document?.platforms?.orientoi?.data || []}
      />
      <PublicEducationalContents
        data={document?.platforms?.inokufu?.data?.data || []}
      />
      <PublicBecomino
        data={document?.platforms?.becomino?.data?.data?.liked || []}
      />
      <PublicPitangoo
        data={document?.platforms?.pitangoo?.data?.data?.missions || []}
      />
      <PublicInokufuAPI data={document?.APIData?.inokufu || []} />
      <PublicPalmAPI data={document?.APIData?.palm || []} />
      <PublicCuriose data={document?.platforms?.curiose?.data || []} />
      {/* 
      <InokufuAPI isPublicPage={true} />
      <Palm isPublicPage={true} />
       */}
    </Content>
  );
};

export default PublicPage;
