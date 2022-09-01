import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Arrow from '../../../assets/icons/arrow-right-solid.svg';
import Eye from '../../../assets/icons/icone-oeil-avec-fond.svg';

import '../../../styles/genericbtn.styl';

const GenericButton = ({
  hasArrow = true,
  textContent,
  type,
  onClickFc = () => {},
  disabled = false,
  eyeIcon = false
}) => {
  return (
    <button
      className={`genericButton ${disabled ? 'btnDisabled' : ''}`}
      type={type}
      onClick={e => onClickFc(e)}
    >
      <p>{textContent}</p>
      {hasArrow && (
        <div className={`genericButtonCircle ${eyeIcon && 'eyeIcon'}`}>
          <Icon icon={eyeIcon ? Eye : Arrow} />
        </div>
      )}
    </button>
  );
};

export default GenericButton;
