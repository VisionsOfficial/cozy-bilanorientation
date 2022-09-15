import React, { createContext, useEffect, useState } from 'react';

import { useClient } from 'cozy-client';
import { visionsTrustApiPOST } from '../../utils/remoteDoctypes';
import { getAccount } from '../../utils/fetchVisionsAggragatorAccount';

const SESSION_STORAGE_ITEM = 'visionsId';

const VisionsAccountContext = createContext();

const VisionsAccountProvider = ({ children }) => {
  const client = useClient();
  const [visionsAccount, setVisionsAccount] = useState(null);
  const [dataStatus, setDataStatus] = useState({
    isLoading: false,
    isLoaded: false
  });

  useEffect(() => {
    const loadVisionsAccount = async () => {
      try {
        const account = await getAccount(client);

        if (!account) {
          setVisionsAccount(null);
          setDataStatus({ isLoaded: false, isLoading: false });
          return;
        }

        if (sessionStorage.getItem(SESSION_STORAGE_ITEM)) {
          setVisionsAccount(
            JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ITEM))
          );
          setDataStatus({ isLoaded: true, isLoading: false });
          return;
        }

        setDataStatus({ isLoading: true, isLoaded: false });
        const res = await visionsTrustApiPOST(client, 'userinfo', {
          visions_id: account.auth.visions_id,
          email: account.auth.email
        });

        sessionStorage.setItem(
          SESSION_STORAGE_ITEM,
          JSON.stringify(res?.userInfo || {})
        );

        setVisionsAccount(res?.userInfo || {});
        setDataStatus({ isLoaded: true, isLoading: false });
      } catch (error) {
        setDataStatus({ isLoaded: false, isLoading: false });
      }
    };

    loadVisionsAccount();
  }, [client]);

  return (
    <VisionsAccountContext.Provider value={{ visionsAccount, dataStatus }}>
      {children}
    </VisionsAccountContext.Provider>
  );
};

export default VisionsAccountContext;

export { VisionsAccountProvider };
