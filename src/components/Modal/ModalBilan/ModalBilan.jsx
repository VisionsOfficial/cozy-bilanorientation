import React, { useState } from 'react'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import Icon from 'cozy-ui/transpiled/react/Icon'

// TMP
import logoVisions from '../../../assets/icons/logo_picto.svg'
import logoTmp from '../../../assets/icons/icon-check.svg'

const ModalBilan = ({ open = false, closeModal, title, email }) => {
  const openModal = open === false ? '' : 'openModal'

  const [confirmation, setConfirmation] = useState(false)
  const confirm = () => {
    setConfirmation(true)
  }

  if (!confirmation) {
    return (
      <div className={`modalContainer ${openModal}`}>
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
            <h3 className="modalTitle">{title}</h3>
            <p className="modalDesc">Votre bilan va être envoyé à {email}</p>
            <div className="modalBtn">
              <ShareBilanBtn
                textContent={'Envoyer mon bilan'}
                onClickFc={() => confirm()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`modalContainer ${openModal}`}>
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
          <p className="modalRecapEmail">{email}</p>
        </div>
      </div>
    </div>
  )
}

export default ModalBilan
