import React from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';

import iconEye from '../../../assets/icons/icone-oeil-avec-fond.svg';

const FindOutMore = ({
  onClickFc,
  textContent = 'Partager mon bilan',
  hasIcon = true
}) => {
  const showIcon = hasIcon ? 'btnEye' : 'btnDisplayNone';
  return (
    <div className='btnShare' onClick={() => onClickFc()}>
      <p className='btnText'>{textContent}</p>
      <div className={showIcon}>
        <Icon icon={iconEye} />
      </div>
    </div>
  );
};

export default FindOutMore;
