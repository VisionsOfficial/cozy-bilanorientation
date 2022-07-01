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
    background: 'linear-gradient(to right, #16f7b465, #21bbee65)'
  },
  text: {
    fontWeight: 'bold'
  },
  icon: {
    backgroundImage: 'linear-gradient(90deg, #71f2b8, #21bbee)',
    webkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
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
            <Icon icon={leftIcon} size={smallSize} />
          </ListItemIcon>
          <ListItemText primary={text} style={style.text} />
          <ListItemSecondaryAction>
            <Icon
              icon={RightIcon}
              size={smallSize}
              className="u-mr-1 u-coolGrey"
              style={style.icon}
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
