// Functions related to the visions.cozy doctype.
// Used to save different types of information on the user and on the status of the application.
// Each document has a "category" field which allows for better organisation of what type of
// data the document stores

// Existing Categories:
// settings: Application related settings
// user: Various user related data

import { Q } from 'cozy-client';

const DOCTYPE = 'visions.cozy';

export const DOCTYPE_COLLECTIONS = {
  USER: 'user',
  SETTINGS: 'settings',
  USER_DOCUMENTS: 'userDocuments'
};

/**
 * Fetches the document of the set category
 * @param {string} category The document category field
 */
export const getVisionsCozyDocument = async (client, category) => {
  const queryDef = Q(DOCTYPE).where({
    category: category
  });

  const document = await client.query(queryDef);

  if (document?.data?.length === 0) {
    // Create document as it doesn't exist yet
    const newDocument = await createVisionsCozyDocument(client, category);
    return newDocument.data;
  }

  // TODO : Purge if more than one docs ?

  return document.data[0];
};

/**
 * Creates / Initializes the cozy visions document of the set category
 * @param {CozyClient} client the cozy client from the useClient()
 * @param {string} category The category of the document
 * @param {object} fields Optional fields to save with the document
 * @returns object inside which everything saved is in the "data" key
 */
export const createVisionsCozyDocument = async (
  client,
  category,
  fields = {}
) => {
  const response = await client.save({
    _type: 'visions.cozy',
    category: category,
    ...fields
  });

  return response;
};

export const updateVisionsCozyDocument = async (client, category, fields) => {
  const document = await getVisionsCozyDocument(client, category);
  const updatedDocument = await client.save({ ...document, ...fields });
  return updatedDocument.data;
};

/**
 * Deletes a VisionsCozy document
 * @param {CozyClient} client The cozy client instance
 * @param {object} document The cozy document to destroy
 * @returns deletion response
 */
export const deleteVisionsCozyDocument = async (client, document) => {
  const response = await client.destroy(document);
  return response;
};

/**
 * Generates a public share code for a document in the visions.cozy doctype
 * @param {CozyClient} client The cozy client instance
 * @param {object} document The cozy document to share
 * @returns The public sharecode
 */
export const createPublicShareCode = async (client, document) => {
  const shareObject = await client
    .collection('io.cozy.permissions')
    .createSharingLink({
      _id: document.id,
      _type: 'visions.cozy'
    });

  const shareCode = shareObject.data.attributes.shortcodes.email;
  return shareCode;
};

/**
 * Generates a public share code for a document in the visions.cozy doctype, generates
 * the full url for it and stores it in the session
 * @param {CozyClient} client The cozy client instance
 * @param {object} document The cozy document to share
 * @returns The full public report url
 */
export const createPublicReportLink = async (client, document) => {
  const shareCode = await createPublicShareCode(client, document);
  const publicReportLink = `${location.protocol}//${location.host}/public/?sharecode=${shareCode}`;
  sessionStorage.setItem('pubshare', publicReportLink);
  return publicReportLink;
};
