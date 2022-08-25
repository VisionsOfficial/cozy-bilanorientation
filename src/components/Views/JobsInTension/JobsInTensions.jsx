import React, { useState } from 'react';
import Orientoi from './Orientoi';
import Palm from './Palm';
import Inokufu from './Inokufu';
import ShareBilanBtn from '../../Button/ShareBilanBtn';
import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric';
import Doceo from './Doceo';

const JobsInTensions = () => {
  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen);
  };
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
      <Inokufu />
      <Palm />
      <Doceo />
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  );
};

export default JobsInTensions;
