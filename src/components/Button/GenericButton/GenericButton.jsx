import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Arrow from '../../../assets/icons/arrow-right-solid.svg';
import Eye from '../../../assets/icons/icone-oeil-avec-fond.svg';

import '../../../styles/genericbtn.styl';

const GenericButton = ({
  hasArrow = true,
  textContent,
  color,
  type,
  role,
  tag = 'button',
  onClickFc = () => {},
  disabled = false,
  eyeIcon = false
}) => {
  let CustomTag = tag;

  let colorGenericButton;
  switch (color) {
    case 'gradient':
      colorGenericButton = 'genericButtonGradient';
      break;
    default:
      colorGenericButton = '';
      break;
  }

  return (
    <CustomTag
      className={`genericButton ${
        disabled ? 'btnDisabled' : ''
      } ${colorGenericButton}`}
      type={type}
      tabIndex='0'
      role={role}
      onClick={e => onClickFc(e)}
    >
      <p>{textContent}</p>
      {hasArrow && (
        <div className={`genericButtonCircle ${eyeIcon && 'eyeIcon'}`}>
          <Icon icon={eyeIcon ? Eye : Arrow} />
        </div>
      )}
    </CustomTag>
  );
};

export default GenericButton;
