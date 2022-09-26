import React, { useState } from 'react';
import { useVisionsAccount } from '../../../Hooks/useVisionsAccount';
import { megaApplyApiPOST } from '../../../../utils/remoteDoctypes';
import { useClient } from 'cozy-client';
import log from 'cozy-logger';

import GenericButton from '../../../Button/GenericButton/GenericButton';

const publicLinkTMP = `${location.protocol}//${location.host}/#/bilanorientation?shareCode=45dsf45`;

const JobufoModal = ({ OF, offerUrl, btnClickFc }) => {
  const [confirmed, setConfirmed] = useState(false);
  const { visionsAccount } = useVisionsAccount();
  const client = useClient();

  const jobufoModalClickFc = async () => {
    setConfirmed(true);
    if (!visionsAccount) return;
    try {
      await megaApplyApiPOST(client, visionsAccount, offerUrl);
    } catch (err) {
      log('error', err.message);
    }
  };

  const handleClick = e => {
    e.stopPropagation();
    btnClickFc(jobufoModalClickFc);
  };

  const data = {
    title: !confirmed
      ? `Vous êtes intéressé par la formation`
      : `Votre bilan a bien été transmis à ${OF}`,
    body: !confirmed ? (
      <>
        <p>
          Envoyer votre bilan à <b>{OF}</b> qui vous recontactera pour en
          discuter. Vos données seront uniquement utilisées par <b>{OF}</b> pour
          communiquer avec vous à propos de cette formation et rien
          d&apos;autre.
        </p>
        <p>
          En cliquant sur Accepter le partage, votre bilan sera automatiquement
          partagé avec <b>{OF}</b>
        </p>
      </>
    ) : (
      <>
        {' '}
        <p>
          Vous pouvez également partager le lien suivant pour donner accès à
          votre bilan d&apos;orientation : <br />
          <br />
          <a href={'/#/bilanorientation'} className='modalPublicLink'>
            {publicLinkTMP}
          </a>
        </p>
      </>
    )
  };

  if (OF) {
    return (
      <section className='contentEmailModal'>
        <div>
          <header>
            <h3>{data.title}</h3>
          </header>
          {data.body}
        </div>
        {!confirmed && (
          <GenericButton
            textContent={'Accepter le partage'}
            onClickFc={e => handleClick(e)}
          />
        )}
      </section>
    );
  } else {
    return (
      <section>
        <div>
          Désolé, nous n&apos;aposavons pas les informations nécessaires pour
          envoyer votre Bilan d&apos;aposOrientation
        </div>
      </section>
    );
  }
};

export default JobufoModal;
