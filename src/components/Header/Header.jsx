import React, { useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import PerviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'

const styles = {
  header: {
    paddingLeft: '2rem',
    paddingTop: '40px',
    height: '144px' // full height should be 184px
  },
  backButton: {
    color: '#17243f'
  }
}

// TODO: should be in App.jsx
// <Route /> can pass prop to the mounted component directly
const Title = () => {
  const { pathname } = useLocation()
  const { t } = useI18n()

  let title = t('orientationReport')
  switch (pathname) {
    case '/softSkills':
      title = t('List.softSkills')
      break
    case '/jobExplorations':
      title = t('List.jobExplorations')
      break
    case '/skills':
      title = t('List.skills')
      break
    case '/trainingSearch':
      title = t('List.trainingSearch')
      break
    case '/wip':
      title = t('wip.inProgress')
      break
    case '/jobsintension':
      title = t('jobsInTension')
      break
    case '/index':
      title = t('List.myReport')
      break
    case '/bilanorientation':
      title = t('public')
      break
  }

  return <>{title}</>
}

const Header = () => {
  const { isMobile } = useBreakpoints()
  const { pathname } = useLocation()
  const history = useHistory()

  const showBackButton = pathname !== '/index' ? true : false
  const showBackButtonPublic = pathname !== '/bilanorientation' ? true : false

  const goBack = useCallback(() => history.goBack(), [history])
  if (isMobile) return null

  return (
    <div style={styles.header} className="headerBackground">
      <div className="u-flex">
        {showBackButton && showBackButtonPublic && (
          <IconButton
            className="u-mr-1"
            style={styles.backButton}
            onClick={goBack}
          >
            <Icon icon={PerviousIcon} />
          </IconButton>
        )}
        <Typography variant="h2" style={{ color: '#17243f' }}>
          <Title />
        </Typography>
      </div>
    </div>
  )
}

export default Header
