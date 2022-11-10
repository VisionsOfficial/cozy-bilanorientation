import { useClient } from 'cozy-client';
import React, { useRef, useState, useEffect } from 'react';
import GenericButton from '../../../../../components/Button/GenericButton';
import {
  DOCTYPE_COLLECTIONS,
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../../../../../utils/visions.cozy';
import { conditionsFile } from '../../../../../utils/fileTypeCondition';
import Loader from '../../../../Loader/Loader';

// Cozy labrary
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import Icon from 'cozy-ui/transpiled/react/Icon';
import FileInput from 'cozy-ui/transpiled/react/FileInput';
import { getPdfText } from '../../../../../utils/pdfjsStuff';
import { fileToArrayBuffer } from '../../../../../utils/fetchJsonFileByName';

// IMG
import ExchangeIcon from 'cozy-ui/transpiled/react/Icons/Exchange';
import iconEye from '../../../../../assets/icons/icone-oeil-avec-fond.svg';
import { CVLETTERS_METHODS } from '../../CVAndCoverLetter';

const EditingDocument = ({ stepResumes, method, importFile }) => {
  const client = useClient();
  const refTitleInput = useRef(null);
  const [textAreaContent, setTextAreaContent] = useState('');
  const [file, setFile] = useState(importFile);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const extensionFile = importFile?.name.split('.')[1] || '';

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!file) {
      setFileName('Ma Lettre de motivation');
      setFileType('motivation letter');
      return;
    }
    setFileName(file.name);
    setFileType(file.type);
  }, [file]);

  const importDocument = async event => {
    let reader, fileType;

    const preCheckType = conditionsFile.motivationLetter.some(el =>
      event.name.includes(el)
    );
    if (preCheckType) fileType = 'motivation letter';

    const preCheckCV = conditionsFile.CV.some(el => event.name.includes(el));
    if (preCheckCV) fileType = 'CV';

    switch (event.type) {
      case 'text/plain':
        reader = await fileToArrayBuffer(event);
        setFile({
          name: event.name,
          text: reader,
          type: preCheckType || preCheckCV ? fileType : ''
        });
        break;
      case 'application/pdf':
        reader = await getPdfText(event);
        setFile({
          name: event.name,
          text: reader,
          type: preCheckType || preCheckCV ? fileType : ''
        });
        break;
      default:
        alert("Le format de votre document n'est pas supporté");
        break;
    }
  };

  const renameFile = event => {
    setFileName(`${event.target.value}`);
  };

  const validEditing = async () => {
    const newFile = {
      name: extensionFile ? `${fileName}.${extensionFile}` : fileName,
      type: fileType,
      date: Date.now(),
      text: method === CVLETTERS_METHODS.IMPORT ? file.text : textAreaContent
    };

    if (method === CVLETTERS_METHODS.IMPORT) {
      if (fileName.split('.')[0] === '') {
        refTitleInput.current.style.outline = '2px solid red';
        alert('Veuillez donner un titre à votre document');
        return;
      }
      refTitleInput.current.style.outline = 'none';
    }

    if (
      (method === CVLETTERS_METHODS.MANUAL && textAreaContent === '') ||
      (method === CVLETTERS_METHODS.MANUAL && fileName === '')
    ) {
      return alert('Impossible de sauvegarder un titre ou texte vide !');
    }

    setButtonClicked(true);

    const document = await getVisionsCozyDocument(
      client,
      DOCTYPE_COLLECTIONS.USER_DOCUMENTS
    );

    const createDocument = await updateVisionsCozyDocument(
      client,
      DOCTYPE_COLLECTIONS.USER_DOCUMENTS,
      {
        documents: document.documents
          ? [...document.documents, newFile]
          : [newFile]
      }
    );
    stepResumes(CVLETTERS_METHODS.MAIN);
    return createDocument;
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
            ref={refTitleInput}
            tabIndex='0'
            maxLength={'30'}
            onChange={e => renameFile(e)}
            value={fileName}
          />
        </div>
        <div className='inputContent'>
          <label htmlFor='coverLetter'>Type de votre document</label>
          <select
            name='coverLetter'
            id='coverLetter'
            onChange={e => setFileType(e.currentTarget.value)}
            value={fileType}
          >
            <InputTypeOption
              value={'motivationLetter'}
              verboseValue={'Lettre de motivation'}
            />
            <InputTypeOption value={'CV'} />
          </select>
        </div>
      </div>

      <p className='labelContent'>
        {method === CVLETTERS_METHODS.IMPORT
          ? 'Votre document importé'
          : 'Écrivez votre document ci-dessous'}
      </p>
      <div className='containerSelectDocument'>
        {method === CVLETTERS_METHODS.IMPORT && file && (
          <div className='contentSelectDocument'>
            <div className='contentFile'>
              <div className='contentFileTitle'>
                <div className='contentFileIcon'>
                  <Icon icon={iconEye} />
                </div>
                <p>{fileName}</p>
              </div>
              <div className='contentFileIcon'>
                <FileInput className='file-selector' onChange={importDocument}>
                  <span role='button'>
                    <Icon icon={ExchangeIcon} />
                  </span>
                </FileInput>
              </div>
            </div>
          </div>
        )}
        {method === CVLETTERS_METHODS.MANUAL && (
          <>
            <textarea
              name='contentDocument'
              id='contentDocument'
              required
              onChange={e => setTextAreaContent(e.currentTarget.value)}
            ></textarea>
          </>
        )}
      </div>

      <div className='btnContainer'>
        {buttonClicked ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Loader size={80} text={'Veuillez patienter...'} />
          </div>
        ) : (
          <GenericButton
            textContent={'valider'}
            hasArrow={false}
            color={'gradient'}
            onClickFc={() => validEditing()}
          />
        )}
      </div>
    </Grid>
  );
};

const InputTypeOption = ({ value, verboseValue }) => {
  return <option value={value}>{verboseValue ? verboseValue : value}</option>;
};

export default EditingDocument;
