import React from 'react';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { selectShowProfile2 } from 'applications/personalization/profile-2/selectors';
import ProfileOneWrapper from 'applications/personalization/profile360/containers/VAProfileApp';
import environment from 'platform/utilities/environment';
import { isLOA1, isLOA3 } from 'platform/user/selectors';
import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';
import LOA3Routes from 'applications/personalization/profile-2/LOA3Routes';
import LOA1Routes from 'applications/personalization/profile-2/LOA1Routes';

const ProfilesWrapper = ({ showProfile2, isLOA1, isLOA3 }) => {
  if (showProfile2 && isLOA1) {
    console.log("LOA1")
    return <Router history={browserHistory}>{LOA1Routes}</Router>
  }

  if (showProfile2 && isLOA3) {
    console.log("LOA3")
    return <Router history={browserHistory}>{LOA3Routes}</Router>
  }

  return <ProfileOneWrapper />
};

const mapStateToProps = state => {
  const featureFlagValue = FEATURE_FLAG_NAMES.profileShowProfile2
  const notProduction = !environment.isProduction()
  const profile2LocalStorage = localStorage.getItem(featureFlagValue) && notProduction

  return {
    showProfile2: selectShowProfile2(state) || profile2LocalStorage,
    isLOA1: isLOA1(state),
    isLOA3: isLOA3(state),
  }
};

export default connect(
  mapStateToProps,
  null,
)(ProfilesWrapper);
