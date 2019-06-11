/* eslint-disable no-param-reassign, no-continue, no-console */
const path = require('path');
const manifestHelpers = require('../webpack/manifest-helpers');
const BUILD_TYPE = require('../../../constants/environments');

const prodEnvironments = new Set([BUILD_TYPE.VAGOVPROD]);

function createTemporaryReactPages(options) {
  return (files, metalsmith, done) => {
    if (!prodEnvironments.has(options.buildtype)) {
      const root = path.join(__dirname, '../../../../..');
      manifestHelpers
        .getAppManifests(root)
        // Skip manifests that are mapping the url from settings.js
        .filter(m => m.rootUrl)
        .forEach(({ entryName, appName, rootUrl }) => {
          // Removing leading and trailing slashes
          const trimmedUrl = rootUrl.endsWith('/')
            ? rootUrl.substring(1, rootUrl.length - 1)
            : rootUrl.substring(1);
          const filePath = `${trimmedUrl}/index.html`;

          if (!files[filePath]) {
            console.log(`Creating temp React landing page: ${rootUrl}`);
            files[filePath] = {
              title: appName,
              entryname: entryName,
              layout: 'page-react.html',
              path: trimmedUrl,
              contents: new Buffer(`
              <nav aria-label="Breadcrumb" aria-live="polite" class="va-nav-breadcrumbs" id="va-breadcrumbs">
                <div class="vads-l-grid-container--full">
                  <div class="usa-alert usa-alert-warning background-color-only">
                    <div class="usa-alert-body">
                      <h3 class="usa-alert-heading">MetalSmith Build Alert</h3>
                      <p>This is a temporary page generated by Metalsmith for testing on dev and staging. You will need to create a page in the vagov-content repo to make it available in production.</p>
                    </div>
                  </div>
                </div>
                <ul class="row va-nav-breadcrumbs-list columns" id="va-breadcrumbs-list">
                  <li><a href="/">Home</a></li>
                  <li><a aria-current="page" href="${rootUrl}">${appName}</a></li>
                </ul>
              </nav>
              `),
            };
          }
        });
    }

    done();
  };
}

module.exports = createTemporaryReactPages;
