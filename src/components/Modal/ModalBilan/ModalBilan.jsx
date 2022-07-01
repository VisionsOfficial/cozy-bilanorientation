import React from 'react'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import Icon from 'cozy-ui/transpiled/react/Icon'

// TMP
import logoTmp from '../../../assets/icons/icon-check.svg'

const ModalBilan = ({ open = false, closeModal, title }) => {
  const openModal = open === false ? '' : 'openModal'

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
          <h3 className="modalTitle">{title}</h3>
          <p className="modalDesc">
            Vous allez être redirigés vers vos profils de partage
          </p>
          <div className="modalBtn">
            <ShareBilanBtn textContent={'Envoyer mon bilan'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBilan
