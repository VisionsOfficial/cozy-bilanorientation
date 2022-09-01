import React from 'react';

import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media';
import Typography from 'cozy-ui/transpiled/react/Typography';
import Icon from 'cozy-ui/transpiled/react/Icon';

import EyeIcon from '../../../assets/icons/icone-oeil-avec-fond.svg';

const styles = {
  imgContainer: {
    paddingRight: '1rem'
  },
  img: {
    width: '65px',
    height: '60px',
    borderRadius: 5
  },
  keywords: {
    margin: '10px 0',
    color: '#C4C4C4',
    padding: '8px',
    textTransform: 'uppercase',
    backgroundColor: '#18233F',
    borderRadius: '6px',
    fontSize: '12px',
    width: 'fit-content'
  },
  title: {
    color: '#21BBEF'
  }
};

const EducationalContent = ({ date, keywords, picture, title, url }) => {
  return (
    <Media>
      <Bd>
        <Media>
          <Img style={styles.imgContainer}>
            <img src={picture} style={styles.img} />
          </Img>
          <Bd>
            <div className='u-flex u-flex-items-center'>
              <Typography variant='caption'>{date}</Typography>
            </div>
            <Typography style={styles.keywords} variant='body1'>
              {keywords}
            </Typography>
            <Typography style={styles.title} variant='h6' component='div'>
              {title}
            </Typography>
          </Bd>
        </Media>
      </Bd>
      <Img style={styles.imgContainer}>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <Icon icon={EyeIcon} size={40} />
        </a>
      </Img>
    </Media>
  );
};

export default EducationalContent;
