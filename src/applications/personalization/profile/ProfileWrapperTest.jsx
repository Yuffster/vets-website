import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { selectShowProfile2 } from 'applications/personalization/profile-2/selectors';
import routes from 'applications/personalization/profile-2/routes';
import ProfileOneWrapper from 'applications/personalization/profile360/containers/VAProfileApp';

const ProfileWrapperTest = ({ showProfile2 }) => {
  if (showProfile2) {
    console.log('Should show profile 2', routes);
    return <Router history={browserHistory}>{routes}</Router>;
  }

  return <ProfileOneWrapper />;
};

const mapStateToProps = state => ({
  showProfile2: selectShowProfile2(state),
});

export default connect(
  mapStateToProps,
  null,
)(ProfileWrapperTest);
