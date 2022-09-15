import React from 'react';
import InokufuAPI from '../../PartnerApis/InokufuAPI/InokufuAPI';

const ReoOffersPage = () => {
  return (
    <>
      <InokufuAPI
        isTension={false}
        project={'reo'}
        provider={'CY Cergy Pontoise'}
      />
    </>
  );
};

export default ReoOffersPage;
