import React, { useState, useEffect } from 'react';
import { useClient } from 'cozy-client';
import GenericButton from '../../../../Button/GenericButton';
import {
  DOCTYPE_COLLECTIONS,
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../../../../../utils/visions.cozy';
import ResumesCard from '../../../../Card/ResumesCard/ResumesCard';
import { conditionsFile } from '../../../../../utils/fileTypeCondition';
import { fileToArrayBuffer } from '../../../../../utils/fetchJsonFileByName';
import { getPdfText } from '../../../../../utils/pdfjsStuff';
import { CVLETTERS_METHODS } from '../../CVAndCoverLetter';
import CustomLoader from '../../../../Loader/CustomLoader';

// Cozy
import FileInput from 'cozy-ui/transpiled/react/FileInput';
import Icon from 'cozy-ui/transpiled/react/Icon';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';

// Img
import iconInformation from '../../../../../assets/icons/icon-info.svg';
import FolderAddIcon from 'cozy-ui/transpiled/react/Icons/FolderAdd';
import iconCV from '../../../../../assets/icons/cv.svg';

const SummaryDocument = ({ stepResumes, fileImport }) => {
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const client = useClient();

  useEffect(() => {
    let isMounted = true;
    setLoader(true);
    const getData = async () => {
      const document = await getVisionsCozyDocument(
        client,
        DOCTYPE_COLLECTIONS.USER_DOCUMENTS
      );
      const allDocuments = document.documents;
      if (isMounted) {
        setLoader(false);
        setFiles(allDocuments);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [client]);

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
        fileImport({
          name: event.name,
          text: reader,
          type: preCheckType || preCheckCV ? fileType : ''
        });
        stepResumes(CVLETTERS_METHODS.IMPORT);
        break;
      case 'application/pdf':
        reader = await getPdfText(event);
        fileImport({
          name: event.name,
          text: reader,
          type: preCheckType || preCheckCV ? fileType : ''
        });
        stepResumes(CVLETTERS_METHODS.IMPORT);
        break;
      default:
        alert("Le format de votre document n'est pas supporté");
        break;
    }
  };

  const removeFile = async index => {
    const existingFiles = [...files];
    existingFiles.splice(index, 1);
    const updateMotivationLetters = await updateVisionsCozyDocument(
      client,
      DOCTYPE_COLLECTIONS.USER_DOCUMENTS,
      { documents: existingFiles }
    );
    setFiles([...existingFiles]);
    return updateMotivationLetters;
  };

  return (
    <Grid className='containerSummaryDocument'>
      {loader && (
        <CustomLoader size={'large'} text={'Chargement des données'} />
      )}
      {!loader && files && files.length === 0 && (
        <div className='containerImportDocument'>
          <Icon icon={FolderAddIcon} />
          <p className='informationImportDocument'>
            Vous n&apos;avez pas de{' '}
            <span className='bold'>lettre de motivation ou de CV</span>,
            importez en une ou rédigez la !
          </p>
        </div>
      )}
      {!loader && files && files.length !== 0 && (
        <>
          <div className='headerSummaryDocument'>
            <h3>Mes CV et lettres de motivation importés</h3>
          </div>
          <div className='contentSummaryDocument'>
            <div className='contentSummaryDocumentInformation'>
              <Icon icon={iconInformation} />
              <p>
                Si vous avez réalisé un bilan de RéOrientation et que vous
                souhaitez découvrir les softs skills qui ressortent de votre CV
                ou lettre de motivation, cliquez sur le bouton analyser de celle
                que vous souhaitez utiliser.
              </p>
            </div>
            <div className='contentSummaryDocumentCards'>
              {files.map((doc, index) => (
                <ResumesCard
                  key={doc.name + index}
                  index={index}
                  icon={iconCV}
                  document={doc}
                  removeFileFC={removeFile}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {!loader && (
        <div className='btnContainer'>
          <GenericButton
            textContent={'écrivez votre document'}
            hasArrow={false}
            color={'gradient'}
            role={'button'}
            tag={'span'}
            onClickFc={() => {
              fileImport([]);
              stepResumes(CVLETTERS_METHODS.MANUAL);
            }}
          />
          <FileInput className='file-selector' onChange={importDocument}>
            <GenericButton
              textContent={'importer un document'}
              hasArrow={false}
              color={'gradient'}
              role={'button'}
              tag={'span'}
            />
          </FileInput>
        </div>
      )}
    </Grid>
  );
};

export default SummaryDocument;
