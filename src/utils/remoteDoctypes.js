const VISIONS_DOCTYPE = 'com.visionstrust';
const PALM_DOCTYPE = 'io.vision.palmapp';
const INOKUFU_DOCTYPE = 'com.inokufu.api';
const INOKUFU_MATCHINGS_DOCTYPE = 'com.inokufu';
const MEGA_APPLY_DOCTYPE = 'com.megaapply.www';
// const MEGA_APPLY_DOCTYPE__DEV = 'com.megaapply.dev';

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

const defaultInokufuApiOptions = {
  provider: 'visions',
  keywords: 'anglais',
  publisher: '',
  match: 'strict',
  sort: 'popularity',
  max: '20',
  model: 'strict',
  page: '0',
  lang: 'fr',
  distanceMax: '',
  address: ''
};
export const inokufuApiGET = async (client, options) => {
  const queryOptions = { ...defaultInokufuApiOptions, ...options };
  const {
    provider,
    keywords,
    publisher,
    match,
    sort,
    max,
    model,
    page,
    lang,
    distanceMax,
    address
  } = queryOptions;
  try {
    const res = await client
      .getStackClient()
      .fetchJSON(
        'GET',
        `/remote/${INOKUFU_DOCTYPE}?provider=${provider}&keywords=${keywords}&publisher=${publisher}&match=${match}&sort=${sort}&max=${max}&model=${model}&page=${page}&lang=${lang}&distanceMax=${distanceMax}&address=${address}`
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

export const megaApplyApiPOST = async (
  client,
  visionsAccount,
  detail_link,
  base64
) => {
  try {
    if (!visionsAccount) throw new Error('Missing user visions account data.');
    if (!base64) throw new Error('Missing base64 pdf');

    const body = {
      data: {
        job: {
          detail_link: detail_link
        },
        applicant: {
          contact: {
            email: visionsAccount.email,
            phone: visionsAccount.phoneNumber,
            lastName: visionsAccount.lastName,
            firstName: visionsAccount.firstName,
            city: visionsAccount.experiencesInfo.city
          }
        },
        documents: [
          {
            name: 'visions_profile.pdf',
            content: base64,
            category: 'OTHER'
          }
        ]
      }
    };

    const res = await client
      .getStackClient()
      .fetchJSON('POST', `/remote/${MEGA_APPLY_DOCTYPE}`, {
        data: JSON.stringify(body)
      });
    return res;
  } catch (err) {
    throw err;
  }
};
