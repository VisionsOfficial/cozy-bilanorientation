import React, { useState } from 'react'
import Orientoi from '../JobsInTension/Orientoi'
import Inokufu from '../JobsInTension/Inokufu'
import Pitangoo from './Pitangoo'
import Curiose from './Curiose'
import ShareBilanBtn from '../../Button/ShareBilanBtn'
import ModalGeneric from '../../Modal/ModalGeneric/ModalGeneric'

const styles = {
  card: {
    borderRadius: '15px'
  }
}

const ProjetReorientation = () => {
  const [open, setOpen] = useState(false)

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen)
  }

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen)
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
        <ShareBilanBtn absolute={true} onClickFc={OpenModal} />
      </div>
      <Orientoi title={'myTalent'} talent={true} />
      <Orientoi title={'offersPorposed'} badge={true} showType={true} />
      <Inokufu />
      <Pitangoo headerBg={'#fff'} addStyles={styles.card} />
      <Curiose
        headerBg={'#fff'}
        title={'curiose.personality'}
        addStyles={styles.card}
      />
      <ModalGeneric open={open} closeModal={closeModal} />
    </>
  )
}

export default ProjetReorientation
