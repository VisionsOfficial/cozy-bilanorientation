import React from 'react'

import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Icon from 'cozy-ui/transpiled/react/Icon'

import EyeIcon from '../../../assets/icons/icon-eye.svg'

const styles = {
  imgContainer: {
    paddingRight: '1rem'
  },
  img: {
    width: '65px',
    height: '60px'
  },
  keywords: {
    marginLeft: '10px',
    color: '#C4C4C4',
    padding: '8px',
    textTransform: 'uppercase',
    backgroundColor: '#18233F',
    borderRadius: '6px',
    fontSize: '12px'
  },
  title: {
    color: '#21BBEF'
  }
}

const EducationalContent = ({ date, keywords, picture, title, url }) => {
  return (
    <Media>
      <Bd>
        <Media>
          <Img style={styles.imgContainer}>
            <img src={picture} style={styles.img} />
          </Img>
          <Bd>
            <div className="u-flex u-flex-items-center">
              <Typography variant="caption">{date}</Typography>
              <Typography
                style={styles.keywords}
                variant="body1"
                component="span"
              >
                {keywords}
              </Typography>
            </div>
            <Typography style={styles.title} variant="h6" component="div">
              {title}
            </Typography>
          </Bd>
        </Media>
      </Bd>
      <Img style={styles.imgContainer}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Icon icon={EyeIcon} size={40} />
        </a>
      </Img>
    </Media>
  )
}

export default EducationalContent
