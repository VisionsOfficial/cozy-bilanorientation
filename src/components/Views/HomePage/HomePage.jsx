import React from 'react';

import { useI18n } from 'cozy-ui/transpiled/react/I18n';

import List from '../../List/List';
import ListItem from '../../List/ListItem';

import iconSoftSkill from '../../../assets/icons/icone-etoile.svg';
import iconJobExplore from '../../../assets/icons/icon-metiers-explore.svg';
import iconCV from '../../../assets/icons/cv.svg';
import iconFormation from '../../../assets/icons/icon-formation.svg';
import iconJobTension from '../../../assets/icons/icon-matching-metier.svg';
import iconOffers from '../../../assets/icons/icon-matching-emploi.svg';
import iconExperience from '../../../assets/icons/icon-experience.svg';
import iconSkills from '../../../assets/icons/ICON-competence.svg';
import iconCareer from '../../../assets/icons/ICON-CARRIERE-PRO.svg';
import iconProProfil from '../../../assets/icons/icone-profil-pro.svg';

import iconBO from '../../../assets/icons/ICON-BO.svg';
import iconREO from '../../../assets/icons/ICON-REO.svg';

// import GraphCircleIcon from "cozy-ui/transpiled/react/icons/GraphCircle";
// import StarIcon from "cozy-ui/transpiled/react/icons/Star";
// import MagnifierIcon from "cozy-ui/transpiled/react/Icons/Magnifier";

const HomePage = () => {
  const { t } = useI18n();

  return (
    <>
      <List title={"Mon Bilan d'Orientation"} icon={iconBO}>
        <ListItem
          link='/results/bo'
          leftIcon={iconJobTension}
          text={'Mes résultats'}
        />
        <ListItem
          link='/jobsintension'
          leftIcon={iconOffers}
          text={
            "Mes propositions de métiers en tensions, d'offres d'emploi et de formations"
          }
          latest={true}
        />
      </List>
      <List title={'Mon Bilan de RéOrientation'} icon={iconREO}>
        <ListItem
          link='/projetreorientation'
          leftIcon={iconJobTension}
          text={'Mes résultats'}
        />
        <ListItem
          link='/wip'
          leftIcon={iconFormation}
          text={'Mes propositions de formations'}
        />
      </List>
      <List title={'Mes données'}>
        <ListItem
          link='/softSkills'
          leftIcon={iconSoftSkill}
          text={t('List.softSkills')}
        />
        <ListItem link='/wip' leftIcon={iconCareer} text={t('List.career')} />
        <ListItem
          link='/jobExplorations'
          leftIcon={iconJobExplore}
          text={t('List.jobExplorations')}
        />
        <ListItem link='/resumes' leftIcon={iconCV} text={t('List.resumes')} />
        <ListItem
          link='/skills'
          leftIcon={iconSkills}
          text={t('List.skills')}
        />
        <ListItem
          link='/wip'
          leftIcon={iconProProfil}
          text={t('List.professionnalProfile')}
        />
        <ListItem
          link='/wip'
          leftIcon={iconExperience}
          text={t('List.experiences')}
          noDivider
        />
      </List>
    </>
  );
};

export default HomePage;
