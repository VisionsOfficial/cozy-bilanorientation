import React from 'react';

import RowGraph from '../../Graph/RowGraph';

const BadgeGraph = ({ data }) => {
  const isTutoVideo = data?.tendencies?.length === 1;
  return (
    <div className='badgeGraph'>
      <h3>{data.name}</h3>
      <div className='contentGraph'>
        {isTutoVideo === true ? (
          <p>Tuto Vidéo</p>
        ) : (
          <div className='boxGraph'>
            {data.tendencies.map((tendencie, index) =>
              tendencie.score ? (
                <div key={index}>
                  <RowGraph
                    percentage={tendencie.score * 100}
                    name={tendencie.name}
                  />
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
              ) : (
                <div key={index}>
                  <RowGraph percentage={0.03 * 100} name={tendencie.name} />
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
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeGraph;
