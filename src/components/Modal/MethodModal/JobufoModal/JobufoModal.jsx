import React, { useState } from 'react';
import { useVisionsAccount } from '../../../Hooks/useVisionsAccount';
import { megaApplyApiPOST } from '../../../../utils/remoteDoctypes';
import { useClient } from 'cozy-client';
import log from 'cozy-logger';

import GenericButton from '../../../Button/GenericButton/GenericButton';

import SVGtoPDF from 'svg-to-pdfkit';
import { useEffect } from 'react';

import { vgSVG as svg } from '../../../../shared/svgs';

const JobufoModal = ({ OF, offerUrl, btnClickFc }) => {
  const [confirmed, setConfirmed] = useState(false);
  const { visionsAccount } = useVisionsAccount();
  const client = useClient();

  const [blob, setBlob] = useState(null);

  const toBase64 = file =>
    new Promise(res => {
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result);
      reader.readAsDataURL(file);
    });

  const jobufoModalClickFc = async () => {
    setConfirmed(true);
    if (!visionsAccount) return;

    try {
      window.PDFDocument.prototype.addSVG = function(svg, x, y, options) {
        return SVGtoPDF(this, svg, x, y, options), this;
      };

      const doc = new window.PDFDocument();
      const stream = doc.pipe(window.blobStream());
      await doc.addSVG(svg, 10, -300, { width: 300 });
      doc.moveDown(10);
      doc.fontSize(14);
      doc.text(`${visionsAccount.firstName} ${visionsAccount.lastName}`);
      doc.text(`${visionsAccount.email}`);
      doc.text(`Tel : ${visionsAccount.phoneNumber || 'Non renseigné'}`);
      doc.text(
        `Niveau d'études : ${visionsAccount.experiencesInfo?.scholarshipLevel ||
          'Non renseigné'}`
      );
      doc.text(
        `Ville : ${visionsAccount.experiencesInfo?.city || 'Non renseigné'}`
      );
      doc.text(
        `Situation Professionnelle : ${visionsAccount.experiencesInfo
          ?.situation || 'Non renseigné'}`
      );

      doc.moveDown(2);
      doc.fillColor('blue');
      doc.text(
        `Lien vers le bilan de ${visionsAccount.firstName} ${visionsAccount.lastName}`,
        {
          link: sessionStorage.getItem('pubshare') || null
        }
      );
      doc.end();
      stream.on('finish', () => {
        setBlob(stream.toBlob('application/pdf'));
      });
    } catch (err) {
      log('error', err);
    }
  };

  useEffect(() => {
    const setBase64AndSend = async () => {
      if (!blob) return;
      if (!visionsAccount) return;

      // HARDCODE for OpenClassrooms
      const verifyOfferURL = () => {
        if (OF.toLowerCase() === 'openclassrooms')
          return 'https://share.hsforms.com/10ZF0bakxR-iiYzPJt9iAiQ18llt';
        return offerUrl;
      };

      try {
        let base64 = await toBase64(blob);
        // Convert Data URI to Binary
        const base64Index = base64.indexOf(';base64,') + ';base64,'.length;
        base64 = base64.substring(base64Index);
        await megaApplyApiPOST(
          client,
          visionsAccount,
          verifyOfferURL(),
          base64
        );
        setBlob(null);
      } catch (err) {
        log('error', err);
        setBlob(null);
      }
    };

    setBase64AndSend();
  }, [blob, client, offerUrl, visionsAccount, OF]);

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
          <a
            href={sessionStorage.getItem('pubshare')}
            className='modalPublicLink'
          >
            {sessionStorage.getItem('pubshare')}
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
