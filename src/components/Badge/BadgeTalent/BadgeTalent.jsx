import React, { useRef, useEffect } from 'react';
import Icon from 'cozy-ui/transpiled/react/Icon';

import iconStar from '../../../assets/icons/star-solid.svg';
import { mediumSize } from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon';

const BadgeTalent = ({ name, percentage }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref) return;

    const circle = ref.current;
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    setProgress(percentage);
  }, [ref, percentage]);

  return (
    <div className='badgeTalent'>
      <div className='contentTalent'>
        <div className='iconStarTalent'>
          <Icon icon={iconStar} size={mediumSize} />
        </div>
        <div>{percentage}%</div>
        <svg className='progress-ring' width='120' height='120'>
          <circle
            className='progress-ring__circle'
            stroke='#17243f'
            strokeWidth='6.5'
            fill='transparent'
            r='52'
            cx='60'
            cy='60'
          />
        </svg>
        <svg className='progress-ring' width='120' height='120'>
          <defs>
            <linearGradient id='myGradient'>
              <stop offset='0%' stopColor='#16f7b4' />
              <stop offset='100%' stopColor='#21bbee' />
            </linearGradient>
          </defs>
          <circle
            ref={ref}
            className='progress-ring__circle'
            stroke='url(#myGradient)'
            strokeWidth='7'
            fill='transparent'
            r='52'
            cx='60'
            cy='60'
          />
        </svg>
      </div>
      <p className='talentName'>{name}</p>
    </div>
  );
};

export default BadgeTalent;
