import React, { useState, useRef } from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ShareBilanBtn from '../../Button/ShareBilanBtn'

// TMP
import logoTmp from '../../../assets/icons/icon-check.svg'

const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

const ModalGeneric = ({ open = false, closeModal }) => {
  const openModal = open === false ? '' : 'openModal'

  const emailRef = useRef()

  const [confirmation, setConfirmation] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const confirm = () => {
    if (regex.test(emailRef.current.value)) {
      setConfirmation(true)
      setSaveEmail(emailRef.current.value)
    } else {
      alert('mauvaise adresse email')
    }
  }

  if (confirmation) {
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
            <h3 className="modalTitle">
              Votre bilan a bien été envoyé à {saveEmail}{' '}
            </h3>
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
          <h3 className="modalTitle">
            Veuillez informer l'adresse email de l'envoie de votre bilan
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
              textContent={'Envoyer mon bilan'}
              onClickFc={() => confirm()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalGeneric
