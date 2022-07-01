import React from 'react'

const ShareBilanBtn = ({
  absolute = false,
  onClickFc,
  textContent = 'Partager mon bilan'
}) => {
  return (
    <div
      style={{
        position: absolute ? 'absolute' : null,
        top: absolute ? -60 : null,
        right: absolute ? 0 : null
      }}
      className="btnShare"
      onClick={() => onClickFc()}
    >
      <p className="btnText">{textContent}</p>
      <div className="btnCircle">
        <p className="btnArrow">&#x2192;</p>
      </div>
    </div>
  )
}

export default ShareBilanBtn
