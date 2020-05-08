import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { isLOA1, isLOA3 } from 'platform/user/selectors';
import LOA3Routes from 'applications/personalization/profile-2/LOA3Routes';
import LOA1Routes from 'applications/personalization/profile-2/LOA1Routes';

const ProfileTwoWrapper = ({ isLOA1, isLOA3 }) => {
  let routes;

  if (isLOA3) {
    routes = LOA3Routes
  }

  if (isLOA1) {
    routes = LOA1Routes
  }

  return <Router history={browserHistory}>{routes}</Router>;
};

const mapStateToProps = state => ({
  isLOA1: isLOA1(state),
  isLOA3: isLOA3(state),
});

export default connect(
  mapStateToProps,
  null,
)(ProfileTwoWrapper);
