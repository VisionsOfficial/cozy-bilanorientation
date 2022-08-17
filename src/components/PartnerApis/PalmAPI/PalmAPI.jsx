import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useClient } from 'cozy-client';
import { palmApiPOST } from '../../../utils/remoteDoctypes';

const PalmAPI = ({ email }) => {
  const client = useClient();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await palmApiPOST(client, { email });
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
  }, [client, email]);

  if (error)
    return <div>Une erreur est survenue lors du chargement des données</div>;

  if (loading)
    return (
      <div>Veuillez patienter, nous récupérons les offres adaptées...</div>
    );

  return (
    <div>
      <h4>TODO : Utiliser les données reçues pour construire l&aposUI</h4>
      {data.map(() => {
        <p>VERIFIER LA STRUCTURE DE DONNEES</p>;
      })}
    </div>
  );
};

export default PalmAPI;
