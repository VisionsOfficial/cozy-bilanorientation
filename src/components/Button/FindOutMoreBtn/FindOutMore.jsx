import React from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'

import iconEye from '../../../assets/icons/icone-oeil-avec-fond.svg'

const FindOutMore = ({ onClickFc, textContent = 'Partager mon bilan' }) => {
  return (
    <div className="btnShare" onClick={() => onClickFc()}>
      <p className="btnText">{textContent}</p>
      <div className='btnEye'>
        <Icon icon={iconEye} />
      </div>
    </div>
  )
}

export default FindOutMore
