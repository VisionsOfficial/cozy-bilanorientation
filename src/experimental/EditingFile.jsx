import { useClient } from 'cozy-client';
import React, { useRef, useState, useEffect } from 'react';
import { conditionsFile } from '../utils/fileTypeCondition';
import {
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../utils/visions.cozy';
import { getPdfText } from '../utils/pdfjsStuff';
import { fileToArrayBuffer } from '../utils/fetchJsonFileByName';

const EditingFile = ({ stepResumes, importFile }) => {
  // ALL function experimental for editing files page CV
  const client = useClient();
  const fileContainer = useRef(null);
  const btnSave = useRef(null);
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

  const activeFile = index => {
    document
      .querySelectorAll('.contentSelectDocument')
      [index].classList.toggle('active');
  };

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
        setFiles(oldArray => [
          ...oldArray,
          {
            name: event.name,
            text: reader,
            type: preCheckType || preCheckCV ? fileType : ''
          }
        ]);
        break;
      case 'application/pdf':
        reader = await getPdfText(event);
        setFiles(oldArray => [
          ...oldArray,
          {
            name: event.name,
            text: reader,
            type: preCheckType || preCheckCV ? fileType : ''
          }
        ]);
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
        dupplicateFiles[findFile].type = typeFileContainer.current.value;
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
  return <></>;
};

export default EditingFile;
