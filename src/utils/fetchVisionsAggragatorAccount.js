import { Q } from 'cozy-client';

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts';
const VISIONS_AGGREGATOR_ID = 'visions-aggregator';

export const getAccount = async client => {
  try {
    const queryDef = Q(ACCOUNTS_DOCTYPE).where({ _id: VISIONS_AGGREGATOR_ID });
    const { data } = await client.query(queryDef);
    const account = data.length > 0 ? data[0] : null;
    return account;
  } catch (err) {
    throw err;
  }
};
