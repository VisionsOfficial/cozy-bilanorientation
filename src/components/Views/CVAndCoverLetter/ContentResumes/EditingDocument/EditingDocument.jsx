import React, { useRef } from 'react';
import GenericButton from '../../../../../components/Button/GenericButton';

// Cozy labrary
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Icon from 'cozy-ui/transpiled/react/Icon';

// IMG
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';
import iconEye from '../../../../../assets/icons/icone-oeil-avec-fond.svg';

// TMP DATA
const pdfTmp = [
  {
    title: 'Sans Titre.PDF'
  }
];

const EditingDocument = () => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Grid className='containerEditingDocument'>
      <div className='inputGroup'>
        <div className='inputContent'>
          <label htmlFor='titleDocument'>Titre de votre document</label>
          <input type='text' name='titleDocument' id='titleDocument' />
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
          <button>Ecrivez votre texte</button>
          <button onClick={handleClick}>Importez votre document</button>
          <input
            type='file'
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
        </div>
        <div className='contentSelectDocument'>
          {pdfTmp.map((file, index) => (
            <div key={index} className='contentFile'>
              <div className='contentFileTitle'>
                <Icon icon={iconEye} />
                <p>{file.title}</p>
              </div>
              <Icon icon={CrossCircleIcon} />
            </div>
          ))}
        </div>
      </div>

      <div className='btnContainer'>
        <GenericButton
          textContent={'valider'}
          hasArrow={false}
          color={'gradient'}
        />
      </div>
    </Grid>
  );
};

export default EditingDocument;
