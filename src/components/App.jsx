/* global cozy */
import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import cx from 'classnames';

import { useClient } from 'cozy-client';
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout';
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite';
import Alerter from 'cozy-ui/transpiled/react/Alerter';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme';
import BarTitle from 'cozy-ui/transpiled/react/BarTitle';
import Spinner from 'cozy-ui/transpiled/react/Spinner';
import Typography from 'cozy-ui/transpiled/react/Typography';
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints';

import Header from 'src/components/Header';
import SoftSkillsPage from 'src/components/Views/SoftSkillsPage';
import JobExplorationsPage from 'src/components/Views/JobExplorationsPage';
import WipPage from 'src/components/Views/WipPage';
import ExperiencesPage from 'src/components/Views/ExperiencesPage/ExperiencesPage';
import JobsInTensions from './Views/JobsInTension';
import ProjetReorientation from './Views/ProjetReorientation';
import HomePage from './Views/HomePage';
import { useJsonFiles } from 'src/components/Hooks/useJsonFiles';
import PublicPage from './Views/publicPage/PublicPage';

const styles = {
  content: {
    // marginTop: '-55px',
    overflow: 'visible',
    paddingBottom: 50
  }
};

const App = () => {
  const { t } = useI18n();
  const client = useClient();
  const { isMobile } = useBreakpoints();
  const { BarCenter } = cozy.bar;
  const { jsonFiles, allDataStatus } = useJsonFiles();

  return (
    <HashRouter>
      <Layout>
        {isMobile && (
          <BarCenter>
            <MuiCozyTheme>
              <BarTitle>{client.appMetadata.slug}</BarTitle>
            </MuiCozyTheme>
          </BarCenter>
        )}
        <Main style={{ display: 'block', backgroundColor: '#f4fcfe' }}>
          <Header />
          {allDataStatus.isLoading && !allDataStatus.isLoaded ? (
            <>
              <Spinner
                size='xxlarge'
                className='u-flex u-flex-justify-center u-flex-items-center u-mt-3 u-pv-2'
              />
              <Typography
                variant='subtitle1'
                align='center'
                color='textPrimary'
              >
                {t(`JsonFilesProvider.jsonFiles.info`)}
              </Typography>
            </>
          ) : (
            <Content
              style={styles.content}
              className={cx({
                'u-mh-2': !isMobile
              })}
              id='main'
            >
              {!allDataStatus.isLoaded && !allDataStatus.isLoading ? (
                <div className='u-mt-3 u-pt-2'>
                  {Object.keys(jsonFiles).map((key, idx) => {
                    return (
                      !jsonFiles[key].dataLoaded && (
                        <Typography
                          key={idx}
                          variant='subtitle2'
                          align='center'
                          color='secondary'
                        >
                          {t(`JsonFilesProvider.jsonFiles.error`, {
                            name: jsonFiles[key].name
                          })}
                        </Typography>
                      )
                    );
                  })}
                </div>
              ) : (
                <Switch>
                  <Route path='/index' component={HomePage} />
                  <Route path='/softSkills' component={SoftSkillsPage} />
                  <Route
                    path='/jobExplorations'
                    component={JobExplorationsPage}
                  />
                  <Route path='/skills' component={ExperiencesPage} />
                  <Route path='/wip' component={WipPage} />
                  <Route path='/jobsintension' component={JobsInTensions} />
                  <Route path='/bilanorientation' component={PublicPage} />
                  <Route
                    path='/projetreorientation'
                    component={ProjetReorientation}
                  />
                  <Redirect from='/' to='/index' />
                  <Redirect from='*' to='/index' />
                </Switch>
              )}
            </Content>
          )}
        </Main>
        <Alerter t={t} />
        <Sprite />
      </Layout>
    </HashRouter>
  );
};

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App);
