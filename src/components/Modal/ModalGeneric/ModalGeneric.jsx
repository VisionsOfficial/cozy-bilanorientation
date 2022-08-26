import React, { useState, useRef } from "react";
import Icon from "cozy-ui/transpiled/react/Icon";
import ShareBilanBtn from "../../Button/ShareBilanBtn";

// TMP
import logoTmp from "../../../assets/icons/icon-check.svg";
import logoVisions from "../../../assets/icons/logo_picto.svg";

const regex = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/gm;
const publicLinkTMP = `${location.protocol}//${location.host}/#/bilanorientation?shareCode=45dsf45`;

const ModalGeneric = ({ open = false, closeModal }) => {
  const openModal = open === false ? "" : "openModal";

  const emailRef = useRef();

  const [confirmation, setConfirmation] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const confirm = () => {
    setConfirmation(true);
    setSaveEmail(emailRef.current.value);
    // if (regex.test(emailRef.current.value)) {
    //   setConfirmation(true);
    //   setSaveEmail(emailRef.current.value);
    // } else {
    //   alert("adresse email erronée");
    // }
  };

  if (confirmation) {
    return (
      <div className={`backdrop ${openModal}`}>
        <div className="modal">
          <div className="modalHeader">
            <div className="modalLogo">
              <Icon icon={logoTmp} className="modalImg" />
            </div>
            <div className="closeModal" onClick={closeModal}>
              <span>x</span>
            </div>
          </div>
          <div className="modalContent">
            <h3 className="modalTitle">Votre bilan a bien été envoyé à</h3>
            <p className="modalRecapEmail">{saveEmail}</p>
            <p>
              Vous pouvez également partager le lien suivant pour donner accès à
              votre bilan d'orientation : <br />
              <br />
              <a href={"/#/bilanorientation"} className="modalPublicLink">
                {publicLinkTMP}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`backdrop ${openModal}`}>
      <div className="modal">
        <div className="modalHeader">
          <div className="modalLogo">
            <Icon icon={logoVisions} className="modalImg" />
          </div>
          <div className="closeModal" onClick={closeModal}>
            <span>x</span>
          </div>
        </div>
        <div className="modalContent">
          <h3 className="modalTitle">
            Veuillez informer l'adresse email vers laquelle envoyer votre Bilan
          </h3>
          <label htmlFor="email">Adresse Email :</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            required={true}
          />
          <div className="modalBtn">
            <ShareBilanBtn
              textContent={"Envoyer mon bilan"}
              onClickFc={() => confirm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGeneric;
