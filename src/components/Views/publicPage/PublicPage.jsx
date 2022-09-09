import React from 'react';
import { useClient } from 'cozy-client';
import ContactInfo from '../../User/ContactInfo';
import getSharedDocument from 'cozy-sharing/dist/getSharedDocument';

import { getParameterByName } from '../../../utils/urlFunctions';
import { useState } from 'react';
import { useEffect } from 'react';
import PublicOrientoiJobExploration from '../../Public/PublicOrientoiJobExploration';

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
    <>
      <ContactInfo />
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
      {/* 
      <InokufuAPI isPublicPage={true} />
      <Palm isPublicPage={true} />
      <JobReady />
      <EducationalContents />
      <Orientoi title={'myTalent'} talent={true} /> */}
    </>
  );
};

export default PublicPage;
