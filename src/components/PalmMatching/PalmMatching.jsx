import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

const styles = {
  title: {
    textTransform: 'capitalize',
    color: '#21BBEF',
    width: '100%',
    textAlign: 'center'
  },
  bodyText: {
    padding: '0 15px'
  },
  subText: {
    fontWeight: 200
  },
  button: {
    padding: '5px',
    margin: 5,
    background: 'rgb(33, 187, 239)',
    color: 'white',
    fontSize: 15,
    borderRadius: 5,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none'
  }
}

const PalmMatching = ({
  mission_name,
  mission_url,
  company_name,
  mission_description,
  match_details,
  similarity
}) => {
  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Typography style={styles.title} variant="h6" component="div" noWrap>
        {mission_name}
      </Typography>
      <Typography style={styles.bodyText} className="u-mv-half" variant="body1">
        {mission_description}
      </Typography>
      <Typography style={styles.subText} variant="body1">
        {company_name}
      </Typography>
      <Typography style={styles.subText} variant="body1">
        Match: {similarity.toString().split('.')[0] + '%'} <br />
        <br />
        <a style={styles.button} href={mission_url}>
          Voir
        </a>
      </Typography>
    </div>
  )
}

export default PalmMatching
