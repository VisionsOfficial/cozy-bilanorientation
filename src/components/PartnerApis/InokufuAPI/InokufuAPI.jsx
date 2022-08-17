import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import { inokufuApiGET } from '../../../utils/remoteDoctypes';

const InokufuAPI = ({ provider = 'visions', keywords }) => {
  const client = useClient();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await inokufuApiGET(client, { provider, keywords });
      if (res.statusCode !== 200) {
        setLoading(false);
        setError(true);
        return;
      }

      if (res?.response?.content) {
        const content = res.response.content;
        if (content.length > 3) setData(content.slice(0, 3));
        else setData(content);
        setLoading(false);
        setError(false);
      }
    };

    getData();
  }, [client, keywords, provider]);

  if (error)
    return <div>Une erreur est survenue lors du chargement des données</div>;

  if (loading)
    return (
      <div>Veuillez patienter, nous récupérons les offres adaptées...</div>
    );

  return (
    <div>
      {data.map((offer, index) => (
        <div key={index}>
          <p>{offer.title}</p>
          <a href={offer.url}>Voir en détail</a>
          <p>{offer.description}</p>
          <p>{offer.provider}</p>
          <img src={offer.picture} alt='Offer image' />
        </div>
      ))}
    </div>
  );
};

export default InokufuAPI;
