import React, { useState } from 'react';
import Orientoi from './Orientoi';
import Palm from './Palm';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
import ShareBilanBtn from '../../Button/ShareBilanBtn';
import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric';
import Doceo from './Doceo';
import { useEffect } from 'react';
import { visionsTrustApiPOST } from '../../../utils/remoteDoctypes';
import { useClient } from 'cozy-client';

const JobsInTensions = () => {
  const client = useClient();

  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const [mappingData, setMappingData] = useState(undefined);

  useEffect(() => {
    const getMappingData = async () => {
      const res = await visionsTrustApiPOST(client, 'mappings');

      setMappingData(res?.mappings);
    };

    getMappingData();
  }, [client]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 10,
          marginTop: 20
        }}
      >
        <ShareBilanBtn absolute={true} onClickFc={OpenModal} />
      </div>
      <Orientoi title={'offersPorposed'} badge={true} />
      <InokufuAPI
        keywords={'anglais,italien,photoshop'}
        mappingData={mappingData}
      />
      <Palm />
      <Doceo />
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  );
};

export default JobsInTensions;
