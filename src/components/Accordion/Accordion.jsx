import React from 'react'

import MuiAccordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'

const styles = {
  title: {
    textTransform: 'none'
  },
  content: {
    padding: '0px 5px'
  }
}

const Accordion = ({ icon, title, children, bgHeader, addStyles }) => {
  return (
    <MuiAccordion expanded style={addStyles}>
      <AccordionSummary
        expandIcon={<Icon icon={icon} size={37} />}
        style={{ backgroundColor: bgHeader }}
      >
        <Typography variant="h6" component="div" style={styles.title}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={styles.content}>{children}</AccordionDetails>
    </MuiAccordion>
  )
}

export default Accordion
