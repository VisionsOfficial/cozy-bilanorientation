import React from 'react';

import RowGraph from '../../Graph/RowGraph';

const BadgeGraph = ({ data }) => {
  return (
    <div className='badgeGraph'>
      <h3>{data.name}</h3>
      <div className='contentGraph'>
        <div className='boxGraph'>
          {data.tendencies.map((tendencie, index) => (
            <RowGraph
              key={index}
              percentage={tendencie.score * 100}
              name={tendencie.name}
            />
          ))}
          <p className='numberGraph' style={{ right: 187 }}>
            1
          </p>
          <p className='numberGraph' style={{ right: 137 }}>
            2
          </p>
          <p className='numberGraph' style={{ right: 90 }}>
            3
          </p>
          <p className='numberGraph' style={{ right: 43 }}>
            4
          </p>
          <p className='numberGraph'>5</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeGraph;
