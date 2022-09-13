import React, { useRef } from 'react';

import NextIcon from 'cozy-ui/transpiled/react/Icons/Next';
import Icon from 'cozy-ui/transpiled/react/Icon';

const ImportDocumentBtn = ({ submit }) => {
  const refImport = useRef(null);
  const refSubmit = useRef(null);

  return (
    <form action='' method='get'>
      <input
        type='file'
        id='myFile'
        name='filename'
        hidden
        ref={refImport}
        onChange={() => {
          submit(true);
          refSubmit.current.sumbit();
        }}
      />
      <div
        className='btnImportContainer'
        onClick={() => refImport.current.click()}
      >
        <input type='button' value={'Ajouter un document'} />
        <div className='arrowBtn'>
          <Icon icon={NextIcon} />
        </div>
      </div>
      <input type='submit' value={'Submit'} ref={refSubmit} hidden />
    </form>
  );
};

export default ImportDocumentBtn;
