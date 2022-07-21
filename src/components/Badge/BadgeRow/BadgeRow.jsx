import React, { useState } from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalBilan from '../../Modal/ModalBilan/ModalBilan'
import FindOutMore from '../../Button/FindOutMoreBtn/FindOutMore'

const styles = {
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
  isPublicPage,
  showMore
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
        </div>
        <div className="badgeRowTextContainer">
          <Typography
            className="badgeRowTitle"
            variant="h6"
            component="div"
            onClick={() => window.open(url)}
            noWrap
          >
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
              margin: '10px 0px'
            }}
          >
            {!isPublicPage && !showMore && <ShareBilanBtn onClickFc={OpenModal} />}
            {showMore && <FindOutMore textContent={'En savoir +'} />}
          </div>
        </div>
      </div>
      <ModalBilan
        open={open}
        closeModal={closeModal}
        title={title}
        email={'doip@ml.u-cergy.fr'}
      />
    </>
  )
}

export default BadgeRow
