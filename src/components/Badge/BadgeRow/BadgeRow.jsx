import React, { useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'

import IdeaIcon from '../../../assets/icons/icon-idea.svg'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalBilan from '../../Modal/ModalBilan/ModalBilan'

const styles = {
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
    height: '75px',
    borderRadius: '10px'
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
  addStyles,
  isPublicPage
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
        className="u-flex u-flex-row u-flex-items-center badgeRow"
        style={{ background: background, ...addStyles }}
      >
        <div className="badgeRowImageContainer">
          <img src={picture} alt="" style={styles.img} />
          <Icon
            style={styles.icon}
            icon={icon ? icon : IdeaIcon}
            size={40}
            onClick={() => window.open(url)}
          />
        </div>
        <div className="badgeRowTextContainer">
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
              margin: "10px 0px"
            }}
          >
            {!isPublicPage && <ShareBilanBtn onClickFc={OpenModal} />}
          </div>
        </div>
      </div>
      <ModalBilan
        open={open}
        closeModal={closeModal}
        title={title}
        email={"doip@ml.u-cergy.fr"}
      />
    </>
  );
}

export default BadgeRow
