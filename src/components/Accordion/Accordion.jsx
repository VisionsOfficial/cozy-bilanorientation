import React from 'react';

import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from 'cozy-ui/transpiled/react/Typography';
import Icon from 'cozy-ui/transpiled/react/Icon';

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
  btnSeeMore = false,
  seeMoreFC = () => {},
  seeMoreToggled
}) => {
  return (
    <MuiAccordion expanded style={addStyles}>
      <AccordionSummary
        expandIcon={<Icon icon={icon} size={37} />}
        style={{
          backgroundColor: bgHeader,
          position: 'relative',
          marginRight: 100
        }}
      >
        <Typography variant='h6' component='div' style={styles.title}>
          {title}
        </Typography>
        {btnSeeMore ? (
          <div className='btnSeeMore'>
            <div className='btnShare' onClick={() => seeMoreFC()}>
              <p className='btnText'>Voir {seeMoreToggled ? '-' : '+'}</p>
            </div>
          </div>
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
