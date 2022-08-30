import { useContext } from 'react';
import VisionsOFMappingDataContext from '../Context/VisionsOFMappingDataProvider';

export const useMappingData = () => {
  const mappingDataContext = useContext(VisionsOFMappingDataContext);
  if (!mappingDataContext) {
    throw new Error(
      'useMappingData must be used within a VisionsOFMappingDataProvider'
    );
  }
  return mappingDataContext;
};
