import React, { useState } from 'react';
import GenericButton from '../../Button/GenericButton';
import CustomLoader from '../../Loader/CustomLoader';

// Cozy
import Icon from 'cozy-ui/transpiled/react/Icon';
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';

const ResumesCard = ({ icon, document, removeFileFC, index }) => {
  const [removeClick, setRemoveClick] = useState(false);
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
      <div className='btnContainer'>
        {document.analyze ? (
          <GenericButton
            textContent={"Retirer de l'analyse"}
            hasArrow={false}
          />
        ) : (
          <GenericButton textContent={'Analyser'} eyeIcon={true} />
        )}
      </div>
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
