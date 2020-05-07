import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { selectShowProfile2 } from 'applications/personalization/profile-2/selectors';
import { isLOA3 } from 'platform/user/selectors';
import routes from 'applications/personalization/profile-2/routes';
import ProfileOneWrapper from 'applications/personalization/profile360/containers/VAProfileApp';

const ProfileWrapperTest = ({ showProfile2, isLOA3 }) => {
  if (showProfile2) {
    // const routeProps = isLOA3 ? routes : routes;
    // Here we could conditionally pass in LOA3 only routes
    return <Router history={browserHistory}>{routes}</Router>;
  }

  return <ProfileOneWrapper />;
};

const mapStateToProps = state => ({
  showProfile2: selectShowProfile2(state),
  isLOA3: isLOA3(state),
});

export default connect(
  mapStateToProps,
  null,
)(ProfileWrapperTest);
