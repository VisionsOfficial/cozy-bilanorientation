import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import List from '../../List/List'
import ListItem from '../../List/ListItem'
import ShareBilanBtn from '../../Button/ShareBilanBtn'

import iconSoftSkill from '../../../assets/icons/icone-etoile.svg'
import iconBulletin from '../../../assets/icons/icon-bulletin.svg'
import iconJobExplore from '../../../assets/icons/icon-metiers-explore.svg'
import iconCV from '../../../assets/icons/cv.svg'
import iconFormation from '../../../assets/icons/icon-formation.svg'
import iconJobTension from '../../../assets/icons/icon-matching-metier.svg'
import iconOffers from '../../../assets/icons/icon-matching-emploi.svg'
import iconExperience from '../../../assets/icons/icon-experience.svg'
import iconReorientation from '../../../assets/icons/icon-reorientation.svg'

import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric'

const style = {
  medium: {
    width: 30,
    height: 30,
    filter: 'initial'
  }
}

const HomePage = () => {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
        <ShareBilanBtn absolute={true} onClickFc={OpenModal} />
      </div>
      <List title={'Mes données'}>
        <ListItem
          link="/softSkills"
          leftIcon={iconSoftSkill}
          text={t('List.softSkills')}
        />
        <ListItem
          link="/wip"
          leftIcon={iconBulletin}
          text={t('List.schoolReports')}
        />
        <ListItem
          link="/jobExplorations"
          leftIcon={iconJobExplore}
          text={t('List.jobExplorations')}
        />
        <ListItem link="/wip" leftIcon={iconCV} text={t('List.resumes')} />
        <ListItem
          link="/skills"
          leftIcon={iconExperience}
          text={t('List.skills')}
          noDivider
        />
      </List>
      <List title={'Mes fonctionnalités'}>
        <ListItem
          link="/jobsintension"
          leftIcon={iconJobTension}
          text={'Mes Matchings avec les métiers en tension'}
        />
        <ListItem
          link="/wip"
          leftIcon={iconFormation}
          text={'Ma recherche de formation'}
        />
        <ListItem
          link="#"
          leftIcon={iconOffers}
          text={"Mes Matching avec les offres d'emploi"}
        />
        <ListItem
          link="projetreorientation"
          leftIcon={iconReorientation}
          text={'Mon projet de RéOrientation'}
          noFill={true}
          size={style.medium}
          noDivider
        />
      </List>
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  )
}

export default HomePage
