import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import UiListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem';
import ListItemIcon, {
  smallSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon';
import Icon from 'cozy-ui/transpiled/react/Icon';
import ListItemText from 'cozy-ui/transpiled/react/ListItemText';
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction';
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider';
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right';

const style = {
  link: {
    textDecoration: 'none'
  },
  hover: {
    background: 'linear-gradient(to right, #16f7b465, #21bbee65)',
    icon: {
      filter: 'brightness(0.2)'
    },
    arrow: {
      fill: '#17243f'
    }
  },
  text: {
    fontWeight: 'bold'
  }
};

const ListItem = ({
  link,
  leftIcon,
  text,
  noFill = false,
  size,
  noDivider,
  latest = false
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <Link
        style={style.link}
        to={link}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <UiListItem button style={hovered ? style.hover : null}>
          <ListItemIcon>
            <Icon
              icon={leftIcon}
              style={
                (hovered && noFill == false) || size !== undefined
                  ? { ...style.hover.icon, ...size }
                  : null
              }
              className='iconGradient'
            />
          </ListItemIcon>
          <ListItemText
            primary={text}
            className={`listItemText ${latest ? 'newListItem' : ''}`}
          />
          <ListItemSecondaryAction>
            <Icon
              icon={RightIcon}
              size={smallSize}
              className='u-mr-1 iconGradientArrow'
              style={hovered ? style.hover.arrow : null}
            />
          </ListItemSecondaryAction>
        </UiListItem>
      </Link>
      {!noDivider && <Divider variant='inset' />}
    </>
  );
};

ListItem.defaultProps = {
  hasDivider: false
};

export default ListItem;
