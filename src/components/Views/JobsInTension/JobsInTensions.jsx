import React, { useState } from 'react'
import Orientoi from './Orientoi'
import Palm from './Palm'
import Inokufu from './Inokufu'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric'

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
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  )
}

export default JobsInTensions
