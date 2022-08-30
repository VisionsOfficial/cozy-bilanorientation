import React, { createContext, useEffect, useState } from 'react';

import { useClient } from 'cozy-client';
import { visionsTrustApiPOST } from '../../utils/remoteDoctypes';

const VisionsOFMappingDataContext = createContext();

const VisionsOFMappingDataProvider = ({ children }) => {
  const client = useClient();
  const [mappingData, setMappingData] = useState({});
  const [dataStatus, setDataStatus] = useState({
    isLoading: false,
    isLoaded: false
  });

  useEffect(() => {
    const getMappingData = async () => {
      try {
        setDataStatus({ isLoading: true, isLoaded: false });
        const res = await visionsTrustApiPOST(client, 'mappings');

        setMappingData(res?.mappings);
        setDataStatus({ isLoaded: true, isLoading: false });
      } catch (error) {
        setDataStatus({ isLoaded: false, isLoading: false });
      }
    };

    getMappingData();
  }, [client]);

  return (
    <VisionsOFMappingDataContext.Provider value={{ mappingData, dataStatus }}>
      {children}
    </VisionsOFMappingDataContext.Provider>
  );
};

export default VisionsOFMappingDataContext;

export { VisionsOFMappingDataProvider };
