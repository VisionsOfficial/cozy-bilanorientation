const VISIONS_DOCTYPE = 'com.visionstrust';
const PALM_DOCTYPE = 'io.vision.palm-app';
const INOKUFU_DOCTYPE = 'com.inokufu.api';
const INOKUFU_MATCHINGS_DOCTYPE = 'com.inokufu';

export const visionsTrustApiPOST = async (client, path, body = {}) => {
  try {
    const res = await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${VISIONS_DOCTYPE}`, {
        data: JSON.stringify(body),
        path
      });
    return res;
  } catch (err) {
    throw err;
  }
};

export const palmApiPOST = async (client, body) => {
  try {
    const res = await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${PALM_DOCTYPE}`, {
        data: JSON.stringify(body)
      });
    return res;
  } catch (err) {
    throw err;
  }
};

const defaultInokufuApiOptions = { provider: 'visions', keywords: 'anglais' };
export const inokufuApiGET = async (client, options) => {
  const queryOptions = { ...defaultInokufuApiOptions, ...options };
  try {
    const res = await client
      .getStackClient()
      .fetchJSON(
        'GET',
        `/remote/${INOKUFU_DOCTYPE}?provider=${queryOptions.provider}&keywords=${queryOptions.keywords}`
      );
    return res;
  } catch (err) {
    return {
      statusCode: 400,
      error: err
    };
  }
};

export const inokufuApiPOST = async (client, body) => {
  try {
    const res = await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${INOKUFU_MATCHINGS_DOCTYPE}`, {
        data: JSON.stringify(body)
      });
    return res;
  } catch (err) {
    return {
      statusCode: 400,
      error: err
    };
  }
};
