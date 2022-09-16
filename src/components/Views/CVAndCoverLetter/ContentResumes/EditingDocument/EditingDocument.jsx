import { useClient } from 'cozy-client';
import React, { useRef, useState, useEffect } from 'react';
import GenericButton from '../../../../../components/Button/GenericButton';
import {
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../../../../../utils/visions.cozy';

// Cozy labrary
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Icon from 'cozy-ui/transpiled/react/Icon';
import FileInput from 'cozy-ui/transpiled/react/FileInput';
import { getPdfText } from '../../../../../utils/pdfjsStuff';
import { fileToArrayBuffer } from '../../../../../utils/fetchJsonFileByName';

// IMG
import CrossCircleIcon from 'cozy-ui/transpiled/react/Icons/CrossCircle';
import iconEye from '../../../../../assets/icons/icone-oeil-avec-fond.svg';

// in progress
// const conditionsTextFile = ['text', 'txt', 'texte', 'lettre', 'motivation']

const EditingDocument = ({ stepResumes, importFile }) => {
  const client = useClient();
  const fileContainer = useRef(null);
  const typeFileContainer = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles([]);
    const fetchDataDrive = async () => {
      const motivationLetter = await getVisionsCozyDocument(
        client,
        'motivationLetters'
      );
      let allLetters = motivationLetter.motivationLetters;
      allLetters.forEach(letter => {
        // return if two file have same name
        if (letter.name === importFile.name) return;
        // push on state array all files DB
        setFiles(oldArray => [...oldArray, letter]);
      });
    };
    fetchDataDrive();
    // push on state array import file
    setFiles(oldArray => [...oldArray, importFile]);
  }, [client, importFile]);

  const importDocument = async event => {
    let reader;
    switch (event.type) {
      case 'text/plain':
        reader = await fileToArrayBuffer(event);
        setFiles(oldArray => [...oldArray, { name: event.name, text: reader }]);
        break;
      case 'application/pdf':
        reader = await getPdfText(event);
        setFiles(oldArray => [...oldArray, { name: event.name, text: reader }]);
        break;
      default:
        alert("Le format de votre document n'est pas supporté");
        break;
    }
  };

  const removeFile = currentFile => {
    let dupplicateFiles = [...files];
    let filterFile = dupplicateFiles.filter(
      file => file.name !== currentFile.name
    );
    setFiles(filterFile);
  };

  const renameFile = value => {
    let allActiveFiles = document.querySelectorAll('.active');
    let dupplicateFiles = [...files];

    if (allActiveFiles.length === 0) {
      alert("Vous n'avez pas sélectionné de fichier");
    }

    for (let i = 0, n = allActiveFiles.length; i < n; i++) {
      let currentTextValue = allActiveFiles[i].querySelector('p').innerHTML;
      let findFile = dupplicateFiles.findIndex(
        file => file.name === currentTextValue
      );
      if (findFile !== -1) {
        if (value === '') return;
        dupplicateFiles[findFile].name = value;
        setFiles(dupplicateFiles);
      }
    }
  };

  const validEditing = async () => {
    const updateMotivationLetters = await updateVisionsCozyDocument(
      client,
      'motivationLetters',
      { motivationLetters: files }
    );
    stepResumes('recap');
    return updateMotivationLetters;
  };

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
              e.key === 'Enter' ? renameFile(e.target.value) : null
            }
          />
        </div>
        <div className='inputContent'>
          <label htmlFor='coverLetter'>Type de votre document</label>
          <select name='coverLetter' id='coverLetter' ref={typeFileContainer}>
            <option value='lettre de motivation'>Lettre de motivation</option>
            <option value='cv'>CV</option>
          </select>
        </div>
      </div>

      <div className='containerSelectDocument'>
        <div className='inputGroup'>
          <span>Ecrivez votre texte</span>
          <FileInput className='file-selector' onChange={importDocument}>
            <span role='button'>Importez votre document</span>
          </FileInput>
        </div>
        {files &&
          files.length !== 0 &&
          files.map((file, index) => (
            <div
              className='contentSelectDocument'
              key={index}
              onClick={() => {
                document
                  .querySelectorAll('.contentSelectDocument')
                  [index].classList.toggle('active');
              }}
            >
              <div className='contentFile' ref={fileContainer}>
                <div className='contentFileTitle'>
                  <div className='contentFileIcon'>
                    <Icon icon={iconEye} />
                  </div>
                  <p>{file.name}</p>
                </div>
                <div
                  className='contentFileIcon'
                  onClick={() => removeFile(file)}
                >
                  <Icon icon={CrossCircleIcon} />
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className='btnContainer'>
        <GenericButton
          textContent={'valider'}
          hasArrow={false}
          color={'gradient'}
          onClickFc={() => validEditing()}
        />
      </div>
    </Grid>
  );
};

export default EditingDocument;
