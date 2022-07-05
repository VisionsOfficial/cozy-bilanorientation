import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import UiListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon, {
  smallSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'

const style = {
  link: {
    textDecoration: 'none'
  },
  hover: {
    background: 'linear-gradient(to right, #16f7b465, #21bbee65)',
    icon: {
      fill: '#17243f'
    },
    arrow: {
      fill: '#17243f'
    }
  },
  text: {
    fontWeight: 'bold'
  }
}

const ListItem = ({ link, leftIcon, text, noDivider }) => {
  const [hovered, setHovered] = useState(false)
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
            <Icon icon={leftIcon} style={hovered ? style.hover.icon : null} />
          </ListItemIcon>
          <ListItemText primary={text} className="listItemText" />
          <ListItemSecondaryAction>
            <Icon
              icon={RightIcon}
              size={smallSize}
              className="u-mr-1 iconGradient"
              style={hovered ? style.hover.arrow : null}
            />
          </ListItemSecondaryAction>
        </UiListItem>
      </Link>
      {!noDivider && <Divider variant="inset" />}
    </>
  )
}

ListItem.defaultProps = {
  hasDivider: false
}

export default ListItem
