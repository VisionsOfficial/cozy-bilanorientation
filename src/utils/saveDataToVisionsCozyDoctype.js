import {
  getVisionsCozyDocument,
  updateVisionsCozyDocument
} from './visions.cozy';

export const saveJSONFilesToVisionsCozyDoctype = async (client, cozy_files) => {
  // GET CREATE DOC
  await getVisionsCozyDocument(client, 'user');

  const saveData = { platforms: {} };

  for (const partner in cozy_files) {
    if (!cozy_files[partner].dataLoaded) continue;

    saveData.platforms[partner] = cozy_files[partner];
  }
  const updatedDoc = await updateVisionsCozyDocument(client, 'user', saveData);
  return updatedDoc;
};

export const saveAPIDataToVisionsCozyDoctype = async (client, key, data) => {
  // GET CREATE DOC
  const document = await getVisionsCozyDocument(client, 'user');

  const saveData = { APIData: document.APIData || {} };
  saveData.APIData[key] = data;
  const updatedDoc = await updateVisionsCozyDocument(client, 'user', saveData);
  return updatedDoc;
};
