import Icon from 'cozy-ui/transpiled/react/Icon'
import React from 'react'

import Arrow from '../../assets/icons/arrow-right-solid.svg'

const ShareBilanBtn = ({
  absolute = false,
  onClickFc,
  textContent = 'Partager mon bilan'
}) => {
  return (
    <div
      style={{
        position: absolute ? 'absolute' : null,
        top: absolute ? -50 : null,
        right: absolute ? 0 : null
      }}
      className="btnShare"
      onClick={() => onClickFc()}
    >
      <p className="btnText">{textContent}</p>
      <div className="btnCircle">
        <Icon icon={Arrow} />
      </div>
    </div>
  )
}

export default ShareBilanBtn
