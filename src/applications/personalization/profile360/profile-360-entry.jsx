import './sass/profile-360.scss';
import 'platform/polyfills';
import React from 'react';
import ProfileWrapperTest from 'applications/personalization/profile/ProfileWrapperTest';
import startApp from 'platform/startup';
import manifest from './manifest.json';
import reducer from './reducers';

startApp({
  component: <ProfileWrapperTest />,
  entryName: manifest.entryName,
  reducer,
  url: manifest.rootUrl,
});
