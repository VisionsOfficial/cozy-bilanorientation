import React, { useState } from 'react';
// import GenericButton from '../../Button/GenericButton';
import CustomLoader from '../../Loader/CustomLoader';

// Cozy
import Icon from 'cozy-ui/transpiled/react/Icon';
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';

const ResumesCard = ({ icon, document, removeFileFC, index }) => {
  const [removeClick, setRemoveClick] = useState(false);

  // TODO Placeholder fetch api jobready
  // const fetchAPIJobready = async () => {
  //   const res = await fetch('/link/api/jobready', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       text: document.text
  //     }),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   });

  //   if (res.status !== 200) console.error(res);

  //   const data = await res.json();
  // };

  return (
    <div className='cardDocument'>
      <div className='cardDocumentContent'>
        <div className='cardDocumentContentIcon'>
          <Icon icon={icon} />
        </div>
        <h4>{document.name}</h4>
        <p>
          {document.type === 'motivation letter'
            ? 'lettre de motivation'
            : 'CV'}
        </p>
        <p>{new Date(document.date).toLocaleDateString()}</p>
      </div>
      {
        // TODO Keep the code for the jobready APi when it's ready
      }
      {/* <div className='btnContainer'>
        {document.analyze ? (
          <GenericButton
            textContent={"Retirer de l'analyse"}
            hasArrow={false}
          />
        ) : (
          <GenericButton textContent={'Analyser'} eyeIcon={true} />
        )}
      </div> */}
      <div
        className='cardDocumentCross'
        onClick={() => {
          setRemoveClick(true);
          removeFileFC(index);
        }}
      >
        {removeClick ? <CustomLoader /> : <Icon icon={CrossCircleIcon} />}
      </div>
    </div>
  );
};

export default ResumesCard;
