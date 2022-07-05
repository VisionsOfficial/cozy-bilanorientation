import React from 'react'

// import { useI18n } from "cozy-ui/transpiled/react/I18n"
import NavigationList from 'cozy-ui/transpiled/react/NavigationList'
// import NavigationList, {
//   NavigationListHeader,
//   NavigationListSection
// } from 'cozy-ui/transpiled/react/NavigationList'
// import GraphCircleIcon from "cozy-ui/transpiled/react/icons/GraphCircle";
// import StarIcon from "cozy-ui/transpiled/react/icons/Star";
// import MagnifierIcon from "cozy-ui/transpiled/react/Icons/Magnifier";

// import WorkIcon from "../../assets/icons/icon-work.svg";
// import DefaultIcon from "../../assets/icons/default_icon.svg";
// import PersonalDataIcon from "../../assets/icons/icon-personal-data.svg";
// import SchoolIcon from "../../assets/icons/icon-school.svg";

// import ListItem from "./ListItem";

const styles = {
  title: {
    color: '#21bbee',
    background: '#17243f',
    marginBottom: '0px',
    padding: '20px 25px',
    borderRadius: '20px 20px 0px 0px'
  },
  content: {
    marginTop: '0px',
    border: '0.0625rem solid rgba(29,33,42,0.16)',
    borderRadius: '0px 0px 20px 20px',
    overflow: 'hidden'
  }
}

const List = ({ title, children }) => {
  // const { t } = useI18n()

  return (
    <NavigationList>
      <h3 style={styles.title}>{title}</h3>
      <div className="u-bg-white" style={styles.content}>
        <div>{children}</div>
      </div>
      {/* <NavigationListSection style={styles.content}>
        <div className="u-bg-white">{children}</div>
      </NavigationListSection> */}
    </NavigationList>
    // <NavigationList>
    //   <NavigationListSection>
    //     <div className="u-bg-white">
    //       <ListItem
    //         link="/softSkills"
    //         leftIcon={GraphCircleIcon}
    //         text={t('List.softSkills')}
    //       />
    //       <ListItem
    //         link="/wip"
    //         leftIcon={SchoolIcon}
    //         text={t('List.schoolReports')}
    //       />
    //       <ListItem
    //         link="/skills"
    //         leftIcon={WorkIcon}
    //         text={t('List.skills')}
    //       />
    //       <ListItem
    //         link="/jobExplorations"
    //         leftIcon={StarIcon}
    //         text={t('List.jobExplorations')}
    //       />
    //       <ListItem
    //         link="/wip"
    //         leftIcon={PersonalDataIcon}
    //         text={t('List.resumes')}
    //       />
    //       <ListItem
    //         link="/wip"
    //         leftIcon={MagnifierIcon}
    //         text={t('List.trainingSearch')}
    //       />
    //       <ListItem
    //         link="/jobsintensions"
    //         leftIcon={DefaultIcon}
    //         text={t('Métiers en tensions')}
    //         noDivider
    //       />
    //     </div>
    //   </NavigationListSection>
    // </NavigationList>
  )
}

export default List
