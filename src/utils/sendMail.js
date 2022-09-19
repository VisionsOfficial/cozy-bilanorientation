const getJobCollection = client => client.collection('io.cozy.jobs');

/**
 * Sends an email using the cozy jobs
 *
 * * Example mailData
 *
 *{
 *  mode: "from",
 *  to: [{ name: "NAME", email: "EMAIL" }],
 *  subjects: "SUBJECT",
 *  parts: [{ type: "text/plain", body: "STRING_BODY" }]
 *}
 *
 * @param {CozyClient} client
 * @param {any} mailData
 */
export const sendMail = async (client, mailData) => {
  try {
    const jobCollection = getJobCollection(client);
    const data = await jobCollection.create('sendmail', mailData);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const trySendBOMail = async (
  client,
  toName,
  toEmail,
  userInfo,
  subject = "Bilan d'orientation"
) => {
  const publicShareUrl = sessionStorage.getItem('pubshare');
  if (!publicShareUrl) return;

  const jobCollection = getJobCollection(client);
  const mailData = {
    mode: 'from',
    to: [{ name: toName, email: 'felix@visionspol.eu' }],
    subjects: `${subject} - ${userInfo.firstName} ${userInfo.lastName}`,
    parts: [
      { type: 'text/html', html: buildTemplate(userInfo, publicShareUrl) }
    ]
  };

  try {
    const mailJob = await jobCollection.create('sendmail', mailData);
    return mailJob;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

const buildTemplate = (userInfo, publicShareUrl) => {
  const unknown = 'Non renseigné';
  return `
    Vous recevez cet email car un bilan d'orientation vous a été partagé depuis Cozy Cloud.

    Nom complet: ${userInfo.firstName} ${userInfo.lastName},
    Email: ${userInfo.email},
    Telephone: ${userInfo.phoneNumber}
    Ville: ${userInfo?.experiencesInfo?.city || unknown},
    Niveau d'études: ${userInfo?.experiencesInfo?.scholarshipLevel || unknown},
    Situation Professionnelle: ${userInfo?.experiencesInfo?.situation ||
      unknown}

    Pour accéder au bilan d'orientation, veuillez suivre le lien suivant : <a href="${publicShareUrl}">${publicShareUrl}</a>
  `;
};
