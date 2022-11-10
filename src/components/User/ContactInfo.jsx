import React from 'react';

const styles = {
  container: {
    marginTop: 80,
    border: '2px solid grey',
    borderRadius: '4px',
    padding: '10px',
    background: 'white'
  }
};

const ContactInfo = ({ userInfo }) => {
  const visionsUserInfo = userInfo?.visionsUserInfo;

  if (!visionsUserInfo) {
    return <>Une erreur est survenue</>;
  }

  return (
    <div style={styles.container}>
      <h3>
        {visionsUserInfo.firstName} {visionsUserInfo.lastName}
      </h3>
      <hr />
      <p>
        Email: <b>{visionsUserInfo.email}</b>
      </p>
      <p>
        Tel: <b>{visionsUserInfo.phoneNumber}</b>
      </p>
      <p>
        Ville: <b>{visionsUserInfo.experiencesInfo.city}</b>
      </p>
      <p>
        Niveau d&apos;études:{' '}
        <b>{visionsUserInfo.experiencesInfo.scholarshipLevel}</b>
      </p>
      <p>
        Situation: <b>{visionsUserInfo.experiencesInfo.situation}</b>
      </p>
    </div>
  );
};

export default ContactInfo;
