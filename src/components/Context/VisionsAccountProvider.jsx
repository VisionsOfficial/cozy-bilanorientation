import React, { createContext, useEffect, useState } from 'react';

import { useClient } from 'cozy-client';
import { visionsTrustApiPOST } from '../../utils/remoteDoctypes';
import { getAccount } from '../../utils/fetchVisionsAggragatorAccount';
import {
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from '../../utils/visions.cozy';

const VisionsAccountContext = createContext();

const VisionsAccountProvider = ({ children }) => {
  const client = useClient();
  const [visionsAccount, setVisionsAccount] = useState(null);
  const [dataStatus, setDataStatus] = useState({
    isLoading: false,
    isLoaded: false
  });
  const [doctypeUser, setDoctypeUser] = useState(null);

  useEffect(() => {
    const loadVisionsAccount = async () => {
      try {
        const setUserInfo = async visionsUserInfo => {
          // Check to verify it exists (or creates it)
          await getVisionsCozyDocument(client, 'user');
          const doctypeUser = await updateVisionsCozyDocument(client, 'user', {
            visionsUserInfo
          });

          setDoctypeUser(doctypeUser.data);
        };

        const account = await getAccount(client);

        if (!account) {
          setVisionsAccount(null);
          setDoctypeUser(null);
          setDataStatus({ isLoaded: false, isLoading: false });
          return;
        }

        setDataStatus({ isLoading: true, isLoaded: false });
        const res = await visionsTrustApiPOST(client, 'userinfo', {
          visions_id: account.auth.visions_id,
          email: account.auth.email
        });

        // Store data in visions cozy doctype
        await setUserInfo(res || {});
        setVisionsAccount(res || {});
        setDataStatus({ isLoaded: true, isLoading: false });
      } catch (error) {
        setDataStatus({ isLoaded: false, isLoading: false });
      }
    };

    loadVisionsAccount();
  }, [client]);

  return (
    <VisionsAccountContext.Provider
      value={{ visionsAccount, dataStatus, doctypeUser }}
    >
      {children}
    </VisionsAccountContext.Provider>
  );
};

export default VisionsAccountContext;

export { VisionsAccountProvider };
