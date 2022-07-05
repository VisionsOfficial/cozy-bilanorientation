import React, { useState } from 'react'
import Orientoi from './Orientoi'
import Palm from './Palm'
import Inokufu from './Inokufu'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalBilan from '../../Modal/ModalBilan/ModalBilan'

const JobsInTensions = () => {
  const [open, setOpen] = useState(false)

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen)
  }
  return (
    <>
      <ShareBilanBtn absolute={true} onClickFc={OpenModal} />
      <Orientoi />
      <Inokufu />
      <Palm />
      <ModalBilan
        open={open}
        closeModal={closeModal}
        title={'Envoyer mon bilan général'}
      />
    </>
  )
}

export default JobsInTensions
