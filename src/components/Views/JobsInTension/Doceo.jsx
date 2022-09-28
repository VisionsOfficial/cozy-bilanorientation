import React, { useState } from 'react';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import ShareBilanBtn from '../../Button/ShareBilanBtn';
import ModalBilan from '../../Modal/ModalBilan/ModalBilan';

import DoceoIllus from '../../../assets/icons/doceo-formation-illustration.svg';
import Icon from 'cozy-ui/transpiled/react/Icon';
import GlobalModal from '../../Modal/GlobalModal';

const Doceo = () => {
  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen);
  };
  return (
    <Grid className='u-mv-1 containerDoceo' container>
      <div className='textDoceo'>
        <p className='headerDoceo'>
          Vous avez de l&apos;expérience professionnelle ? <br />
          Devenez formateur dans votre domaine d&apos;expertise !
        </p>
        <p>
          Complétez votre activité ou travailler à temps plein en tant que
          formateur grâce à la formation de Doceo (éligible au CPF) <br />
          Doceo vous accompagnera jusqu&apos;au bout de votre projet, de votre
          formation en 3 mois à la mise en relation avec vos futures clients !
        </p>
        {/* <ShareBilanBtn onClickFc={OpenModal} /> */}
      </div>
      <div className='illustrationDoceo'>
        <Icon icon={DoceoIllus} />
      </div>
      <GlobalModal
        open={open}
        closeModal={closeModal}
        hardcodedMethod={5}
        specificEmail={'doceo@test.com'}
      />
    </Grid>
  );
};

export default Doceo;
