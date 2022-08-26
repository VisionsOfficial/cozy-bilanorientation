import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Arrow from '../../../assets/icons/arrow-right-solid.svg';

import '../../../styles/genericbtn.styl';

const GenericButton = ({
  hasArrow = true,
  textContent,
  type,
  onClickFc,
  disabled = false
}) => {
  return (
    <button
      className={`genericButton ${disabled ? 'btnDisabled' : ''}`}
      type={type}
      onClick={e => onClickFc(e)}
    >
      <p>{textContent}</p>
      {hasArrow && (
        <div className={`genericButtonCircle`}>
          <Icon icon={Arrow} />
        </div>
      )}
    </button>
  );
};

export default GenericButton;
