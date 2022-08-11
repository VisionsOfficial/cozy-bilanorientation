const REMOTE_DOCTYPE = 'com.visionstrust';

export const visionsTrustApiPOST = async (client, path, body = {}) => {
  try {
    const res = await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${REMOTE_DOCTYPE}`, {
        data: JSON.stringify(body),
        path
      });
    return res;
  } catch (err) {
    throw err;
  }
};
