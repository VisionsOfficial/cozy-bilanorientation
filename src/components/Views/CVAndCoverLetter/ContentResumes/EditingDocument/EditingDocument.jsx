import React, { useRef, useState } from 'react';
import GenericButton from '../../../../../components/Button/GenericButton';

// Cozy labrary
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Icon from 'cozy-ui/transpiled/react/Icon';
import FileInput from 'cozy-ui/transpiled/react/FileInput';

// IMG
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';
import iconEye from '../../../../../assets/icons/icone-oeil-avec-fond.svg';

const EditingDocument = ({ stepResumes, document }) => {
  const fileContainer = useRef(null);
  const [renameFile, setRenameFile] = useState('');

  return (
    <Grid className='containerEditingDocument'>
      <div className='inputGroup'>
        <div className='inputContent'>
          <label htmlFor='titleDocument'>Titre de votre document</label>
          <input
            type='text'
            name='titleDocument'
            id='titleDocument'
            tabIndex='0'
            onKeyDown={e =>
              e.key === 'Enter' ? setRenameFile(e.target.value) : null
            }
          />
        </div>
        <div className='inputContent'>
          <label htmlFor='coverLetter'>Type de votre document</label>
          <select name='coverLetter' id='coverLetter'>
            <option value='lettre de motivation'>Lettre de motivation</option>
          </select>
        </div>
      </div>

      <div className='containerSelectDocument'>
        <div className='inputGroup'>
          <span>Ecrivez votre texte</span>
          <FileInput className='file-selector' onChange={() => {}}>
            <span role='button'>Importez votre document</span>
          </FileInput>
        </div>
        <div className='contentSelectDocument'>
          {/* Exemple for multiple import */}
          {/* {Object.entries(document).map(([key, value], index) => (
            <div key={index} className='contentFile'>
              <div className='contentFileTitle'>
                <Icon icon={iconEye} />
                <p>{value}</p>
              </div>
              <Icon icon={CrossCircleIcon} />
            </div>
          ))} */}
          <div className='contentFile' ref={fileContainer}>
            <div className='contentFileTitle'>
              <div
                className='contentFileIcon'
                onClick={() => window.open(document.name)}
              >
                <Icon icon={iconEye} />
              </div>
              <p>{renameFile !== '' ? renameFile : document.name}</p>
            </div>
            <div
              className='contentFileIcon'
              onClick={() => (fileContainer.current.style.display = 'none')}
            >
              <Icon icon={CrossCircleIcon} />
            </div>
          </div>
        </div>
      </div>

      <div className='btnContainer'>
        <GenericButton
          textContent={'valider'}
          hasArrow={false}
          color={'gradient'}
          onClickFc={() => stepResumes('recap')}
        />
      </div>
    </Grid>
  );
};

export default EditingDocument;
