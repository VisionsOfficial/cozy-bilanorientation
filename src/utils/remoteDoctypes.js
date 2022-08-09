export const testVisions = async (client, method, remoteDoctype) => {
  try {
    const res = await client
      .getStackClient()
      .fetchJSON("POST", `/remote/${remoteDoctype}`, {
        data: JSON.stringify({ test: 1, data: 2 }),
        path: "cozy"
      });
    return res;
  } catch (err) {
    throw err;
  }
};
