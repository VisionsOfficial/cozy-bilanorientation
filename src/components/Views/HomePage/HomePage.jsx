import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import List from '../../List/List'
import ListItem from '../../List/ListItem'
import ShareBilanBtn from '../../Button/ShareBilanBtn'

import GraphCircleIcon from 'cozy-ui/transpiled/react/icons/GraphCircle'
import StarIcon from 'cozy-ui/transpiled/react/icons/Star'
import MagnifierIcon from 'cozy-ui/transpiled/react/Icons/Magnifier'

import WorkIcon from '../../../assets/icons/icon-work.svg'
import DefaultIcon from '../../../assets/icons/default_icon.svg'
import PersonalDataIcon from '../../../assets/icons/icon-personal-data.svg'
import SchoolIcon from '../../../assets/icons/icon-school.svg'
import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric'

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
      <ShareBilanBtn absolute={true} onClickFc={OpenModal} />
      <List title={'Mes données'}>
        <ListItem
          link="/softSkills"
          leftIcon={GraphCircleIcon}
          text={t('List.softSkills')}
        />
        <ListItem
          link="/wip"
          leftIcon={SchoolIcon}
          text={t('List.schoolReports')}
        />
        <ListItem
          link="/jobExplorations"
          leftIcon={StarIcon}
          text={t('List.jobExplorations')}
        />
        <ListItem
          link="/wip"
          leftIcon={PersonalDataIcon}
          text={t('List.resumes')}
        />
        <ListItem
          link="/skills"
          leftIcon={WorkIcon}
          text={t('List.skills')}
          noDivider
        />
      </List>
      <List title={'Mes fonctionnalités'}>
        <ListItem
          link="/wip"
          leftIcon={MagnifierIcon}
          text={'Ma recherche de formation'}
        />
        <ListItem
          link="/jobsintension"
          leftIcon={DefaultIcon}
          text={'Mes Matchings avec les métiers en tension'}
        />
        <ListItem
          link="#"
          leftIcon={MagnifierIcon}
          text={"Mes Matching avec les offres d'emploi"}
          noDivider
        />
      </List>
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  )
}

export default HomePage
