import React from 'react';

// import { useI18n } from "cozy-ui/transpiled/react/I18n"
import NavigationList from 'cozy-ui/transpiled/react/NavigationList';
import Icon from 'cozy-ui/transpiled/react/Icon';
import { largeSize } from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon';
// import NavigationList, {
//   NavigationListHeader,
//   NavigationListSection
// } from 'cozy-ui/transpiled/react/NavigationList'
// import GraphCircleIcon from "cozy-ui/transpiled/react/icons/GraphCircle";
// import StarIcon from "cozy-ui/transpiled/react/icons/Star";
// import MagnifierIcon from "cozy-ui/transpiled/react/Icons/Magnifier";

const styles = {
  card: {
    margin: '10px 0 20px 0',
    boxShadow: 'rgba(100, 100, 111, 0.3) 0px 0px 10px',
    borderRadius: 20
  },
  content: {
    marginTop: '0px',
    border: '0.0625rem solid rgba(29,33,42,0.16)',
    borderRadius: '0px 0px 20px 20px',
    overflow: 'hidden'
  }
};

const List = ({ icon, title, children }) => {
  // const { t } = useI18n()

  return (
    <NavigationList style={styles.card}>
      <div className='titleSectionHomePage'>
        {icon ? <Icon icon={icon} size={largeSize} /> : <></>}
        <h3>{title}</h3>
      </div>
      <div className='u-bg-white' style={styles.content}>
        <div>{children}</div>
      </div>
      {/* <NavigationListSection style={styles.content}>
        <div className="u-bg-white">{children}</div>
      </NavigationListSection> */}
    </NavigationList>
  );
};

export default List;
