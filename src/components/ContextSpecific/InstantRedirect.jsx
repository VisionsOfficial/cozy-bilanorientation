import React from 'react';
import { Redirect } from 'react-router-dom';

const InstantRedirect = ({ link }) => {
  const hasBeenRedirected = sessionStorage.getItem('hasBeenRedirected');

  if (hasBeenRedirected === 'true') return <></>;

  sessionStorage.setItem('hasBeenRedirected', 'true');

  return <Redirect to={link} />;
};

export default InstantRedirect;
