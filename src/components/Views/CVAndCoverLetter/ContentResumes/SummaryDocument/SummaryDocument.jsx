import React from 'react';
import GenericButton from '../../../../Button/GenericButton';

// Cozy
import FileInput from 'cozy-ui/transpiled/react/FileInput';
import Icon from 'cozy-ui/transpiled/react/Icon';

// Img
import iconInformation from '../../../../../assets/icons/icon-info.svg';
import iconCV from '../../../../../assets/icons/cv.svg';
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';

// TMP
const coverLetters = [
  {
    title: 'sans titre',
    type: 'Lettre de motivation',
    date: '20/09/2022',
    analyze: false
  },
  {
    title: 'sans titre',
    type: 'Lettre de motivation',
    date: '20/09/2022',
    analyze: false
  },
  {
    title: 'sans titre',
    type: 'Lettre de motivation',
    date: '20/09/2022',
    analyze: true
  }
];

const SummaryDocument = ({ stepResumes, file }) => {
  const importDocument = event => {
    if (event.type === 'text/plain' || event.type === 'application/pdf') {
      file(event);
      stepResumes('editing');
    } else {
      alert("Le format de votre document n'est pas supporté");
    }
  };
  return (
    <div className='containerSummaryDocument'>
      <div className='headerSummaryDocument'>
        <h3>Mes CV et lettres de motivation importés</h3>
      </div>
      <div className='contentSummaryDocument'>
        <div className='contentSummaryDocumentInformation'>
          <Icon icon={iconInformation} />
          <p>
            Si vous avez réalisé un bilan de RéOrientation et que vous souhaitez
            découvrir les softs skills qui ressortent de votre CV ou lettre de
            motivation, cliquez sur le bouton analyser de celle que vous
            souhaitez utiliser.
          </p>
        </div>
        <div className='contentSummaryDocumentCards'>
          {coverLetters.map((letter, index) => (
            <div className='cardDocument' key={index}>
              <div className='cardDocumentContent'>
                <div className='cardDocumentContentIcon'>
                  <Icon icon={iconCV} />
                </div>
                <h4>{letter.title}</h4>
                <p>{letter.type}</p>
                <p>{letter.date}</p>
              </div>
              <div className='btnContainer'>
                {letter.analyze ? (
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
                onClick={() =>
                  (document.querySelectorAll('.cardDocument')[
                    index
                  ].style.display = 'none')
                }
              >
                <Icon icon={CrossCircleIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='btnContainer'>
        <FileInput className='file-selector' onChange={importDocument}>
          <GenericButton
            textContent={'nouveau document'}
            hasArrow={false}
            color={'gradient'}
            role={'button'}
            tag={'span'}
          />
        </FileInput>
      </div>
    </div>
  );
};

export default SummaryDocument;
