import React from 'react';

const DEFAULT_INFO = {
  firstName: 'John',
  lastName: 'DOE',
  phoneNumber: '0611223344',
  email: 'johndoe@example.com',
  city: 'Paris',
  situation: 'Etudiant',
  scholarshipLevel: 'Bac +2'
};

const ContactInfo = () => {
  const contactInfo = DEFAULT_INFO;
  return (
    <div
      style={{
        border: '2px solid grey',
        borderRadius: '4px',
        padding: '10px',
        background: 'white'
      }}
    >
      <h3>
        {contactInfo.firstName} {contactInfo.lastName}
      </h3>
      <hr />
      <p>
        Email: <b>{contactInfo.email}</b>
      </p>
      <p>
        Tel: <b>{contactInfo.phoneNumber}</b>
      </p>
      <p>
        Ville: <b>{contactInfo.city}</b>
      </p>
      <p>
        Niveau d&apos;études: <b>{contactInfo.scholarshipLevel}</b>
      </p>
      <p>
        Situation: <b>{contactInfo.situation}</b>
      </p>
    </div>
  );
};

export default ContactInfo;
