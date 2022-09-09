import 'cozy-ui/transpiled/react/stylesheet.css';
import 'cozy-ui/dist/cozy-ui.utils.min.css';

import 'src/styles/index.styl';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import memoize from 'lodash/memoize';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles';

import CozyClient, { CozyProvider } from 'cozy-client';
import { I18n } from 'cozy-ui/transpiled/react/I18n';
import { Document } from 'cozy-doctypes';
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme';
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints';

import setupApp from 'src/targets/browser/setupApp';
import App from 'src/components/App';
import { JsonFilesProvider } from 'src/components/Context/JsonFilesProvider';
import { VisionsOFMappingDataProvider } from '../../components/Context/VisionsOFMappingDataProvider';
import {
  getDataOrDefault,
  getDataset,
  getPublicSharecode
} from '../../utils/initFromDom';

import manifest from '../../../manifest.webapp';
import IsPublicContext from '../../components/Context/IsPublicContext';
import PublicPage from '../../components/Views/publicPage/PublicPage';

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
});

const renderApp = function(client, isPublic) {
  const { root, lang, polyglot } = setupApp();
  render(
    <StylesProvider generateClassName={generateClassName}>
      <CozyProvider client={client}>
        <I18n lang={lang} polyglot={polyglot}>
          <MuiCozyTheme>
            <BreakpointsProvider>
              <IsPublicContext.Provider value={isPublic}>
                {!isPublic && (
                  <JsonFilesProvider>
                    <VisionsOFMappingDataProvider>
                      <App isPublic={isPublic} />
                    </VisionsOFMappingDataProvider>
                  </JsonFilesProvider>
                )}
                {isPublic && <PublicPage />}
              </IsPublicContext.Provider>
            </BreakpointsProvider>
          </MuiCozyTheme>
        </I18n>
      </CozyProvider>
    </StylesProvider>,
    root
  );
};

const initApp = () => {
  const data = getDataset();
  const appIcon = getDataOrDefault(
    data.app.icon,
    require('../vendor/assets/icon.svg')
  );
  const appNamePrefix = getDataOrDefault(
    data.app.prefix || manifest.name_prefix
  );

  const appName = getDataOrDefault(data.app.name, manifest.name);
  const appSlug = getDataOrDefault(data.app.slug, manifest.slug);
  const appVersion = getDataOrDefault(data.app.version, manifest.version);

  const protocol = window.location ? window.location.protocol : 'https:';

  const shareCode = getPublicSharecode();
  const token = shareCode || data.token;
  const isPublic = Boolean(shareCode || !token || token === '');

  // Initialize client
  const client = new CozyClient({
    uri: `${protocol}//${data.domain}`,
    token: token,
    appMetadata: {
      slug: appSlug,
      version: appVersion
    }
  });

  if (!Document.cozyClient) {
    Document.registerClient(client);
  }

  if (!isPublic) {
    // initialize the bar, common of all applications, it allows
    // platform features like apps navigation without doing anything

    // necessary to initialize the bar with the correct React instance
    window.React = React;
    window.ReactDOM = ReactDOM;
    window.cozy?.bar?.init({
      appName: appName,
      appNamePrefix: appNamePrefix,
      iconPath: appIcon,
      cozyClient: client,
      isPublic: isPublic
    });
  }

  return { client, isPublic };
};

const memoizedInit = memoize(initApp);
const init = () => {
  const { client, isPublic } = memoizedInit();
  renderApp(client, isPublic);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

if (module.hot) {
  memoizedInit();
  module.hot.accept();
}
