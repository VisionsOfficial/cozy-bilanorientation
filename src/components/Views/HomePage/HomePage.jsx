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
import useVisionsContextRules, {
  knownContextCodes
} from '../../Hooks/useVisionsContextRules';
import Loader from '../../Loader';
import InstantRedirect from '../../ContextSpecific/InstantRedirect';

const HomePage = () => {
  const { t } = useI18n();
  const { contextRules, isLoading } = useVisionsContextRules();

  if (isLoading) {
    return <Loader text='Chargement...' />;
  }

  if (
    contextRules.context === knownContextCodes.numerique &&
    !sessionStorage.getItem('hasBeenRedirected')
  ) {
    return <InstantRedirect link='/jobsintension' />;
  }

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
          text={t(contextRules.homePage.bo.text.proposals)}
          latest={true}
        />
      </List>

      {contextRules.homePage.visible.reo === true && (
        <List title={'Mon Bilan de RéOrientation'} icon={iconREO}>
          <ListItem
            link='/projetreorientation'
            leftIcon={iconJobTension}
            text={'Mes résultats'}
          />
          <ListItem
            link='/reoOffers'
            leftIcon={iconFormation}
            text={'Mes propositions de formations'}
          />
        </List>
      )}

      {contextRules.homePage.visible.data === true && (
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
          <ListItem
            link='/resumes'
            leftIcon={iconCV}
            text={t('List.resumes')}
          />
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
      )}
    </>
  );
};

export default HomePage;
