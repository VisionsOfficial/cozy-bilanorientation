import React from 'react';

import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from 'cozy-ui/transpiled/react/Typography';
import Icon from 'cozy-ui/transpiled/react/Icon';
import FindOutMore from '../Button/FindOutMoreBtn/FindOutMore';

const styles = {
  title: {
    textTransform: 'none'
  }
};

const Accordion = ({
  icon,
  title,
  children,
  bgHeader,
  addStyles,
  btnSeeMore = false
}) => {
  return (
    <MuiAccordion expanded style={addStyles}>
      <AccordionSummary
        expandIcon={<Icon icon={icon} size={37} />}
        style={{ backgroundColor: bgHeader }}
      >
        <Typography variant='h6' component='div' style={styles.title}>
          {title}
        </Typography>
        {btnSeeMore ? (
          <FindOutMore textContent={'voir +'} hasIcon={false} />
        ) : (
          <></>
        )}
      </AccordionSummary>
      <AccordionDetails className='accordionDetails'>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
