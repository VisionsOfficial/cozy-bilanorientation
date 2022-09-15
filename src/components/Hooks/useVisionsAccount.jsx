import { useContext } from 'react';
import VisionsAccountContext from '../Context/VisionsAccountProvider';

export const useVisionsAccount = () => {
  const visionsAccountContext = useContext(VisionsAccountContext);
  if (!visionsAccountContext) {
    throw new Error(
      'useVisionsAccount must be used within a VisionsAccountProvider'
    );
  }
  return visionsAccountContext;
};
