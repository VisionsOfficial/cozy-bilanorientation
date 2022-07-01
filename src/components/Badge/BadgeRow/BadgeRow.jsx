import React, { useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'

import IdeaIcon from '../../../assets/icons/icon-idea.svg'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalBilan from '../../Modal/ModalBilan/ModalBilan'

const styles = {
  icon: {
    width: '40px',
    height: '40px',
    cursor: 'pointer'
  },
  title: {
    textTransform: 'capitalize',
    color: '#21BBEF',
    width: '100%',
    whiteSpace: 'break-spaces'
  },
  subText: {
    fontWeight: 200,
    textAlign: 'center',
    fontSize: '14px'
  },
  img: {
    width: '100px',
    borderRadius: '10px'
  },
  textContent: {
    margin: '10px',
    width: '70%'
  }
}

const BadgeRow = ({
  title,
  mainText,
  subText,
  icon,
  picture,
  url,
  background = '#FFFFFF',
  addStyles
}) => {
  const [open, setOpen] = useState(false)

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  return (
    <>
      <div
        className="u-flex u-flex-row u-flex-items-center"
        style={{ background: background, ...addStyles }}
      >
        <img src={picture} alt="" style={styles.img} />
        <div style={styles.textContent}>
          <Typography style={styles.title} variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography className="u-mv-half" variant="body1">
            {mainText}
          </Typography>
          <Typography style={styles.subText} variant="body1">
            {subText}
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ShareBilanBtn onClickFc={OpenModal} />
          </div>
        </div>
        <Icon
          style={styles.icon}
          icon={icon ? icon : IdeaIcon}
          size={40}
          onClick={() => window.open(url)}
        />
      </div>
      <ModalBilan open={open} closeModal={closeModal} title={title} />
    </>
  )
}

export default BadgeRow
