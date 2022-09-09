import { useContext } from 'react';
import VisionsOFMappingDataContext from '../Context/VisionsOFMappingDataProvider';

const MAPPING_DATA_CONTEXT_TYPE = {
  mappingData: {
    of: [
      {
        OF: "",
        formation_name: "",
        short_description: "",
        url_redirection: "",
        url_information: "",
        logo: "",
        email: "",
        method: "",
        keywords: ""
      }
    ]
  },
  dataStatus: { isLoaded: false, isLoading: false }
};

export const useMappingData = () => {
  /**
   * @type {MAPPING_DATA_CONTEXT_TYPE} mappingDataContext
   */
  const mappingDataContext = useContext(VisionsOFMappingDataContext);
  if (!mappingDataContext) {
    throw new Error(
      'useMappingData must be used within a VisionsOFMappingDataProvider'
    );
  }
  return mappingDataContext;
};
