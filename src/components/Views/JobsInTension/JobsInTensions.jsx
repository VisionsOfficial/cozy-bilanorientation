import React from 'react';
import Orientoi from './Orientoi';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';
import Doceo from './Doceo';
import PalmAPI from '../../PartnerApis/PalmAPI/PalmAPI';
import Jobdating from './Jobdating';
import useVisionsContextRules, {
  knownContextCodes
} from '../../Hooks/useVisionsContextRules';
import Loader from '../../Loader';

const JobsInTensions = () => {
  const { contextRules, isLoading } = useVisionsContextRules();

  if (isLoading) {
    return <Loader text='Chargement...' />;
  }

  return (
    <>
      {contextRules.boProposals.ot.visible === true && (
        <Orientoi title={'offersPorposed'} badge={true} isTension={true} />
      )}
      {contextRules.context === knownContextCodes.numerique && <Jobdating />}
      {contextRules.boProposals.ik.visible === true && (
        <InokufuAPI isTension={true} project={'smartskills'} />
      )}
      {contextRules.boProposals.palm.visible === true && <PalmAPI />}
      {contextRules.boProposals.doceo.visible === true && <Doceo />}
    </>
  );
};

export default JobsInTensions;
