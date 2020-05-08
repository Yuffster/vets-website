import React from 'react';
import { connect } from 'react-redux';
import { selectShowProfile2 } from 'applications/personalization/profile-2/selectors';
import ProfileOneWrapper from 'applications/personalization/profile360/containers/VAProfileApp';
import ProfileTwoWrapper from 'applications/personalization/profiles-wrapper/ProfileTwoWrapper'
import environment from 'platform/utilities/environment';

const ProfilesWrapper = ({ showProfile2 }) => (
  showProfile2 ? <ProfileTwoWrapper /> : <ProfileOneWrapper />
);

const mapStateToProps = state => ({
  showProfile2: selectShowProfile2(state) || !environment.isProduction(),
});

export default connect(
  mapStateToProps,
  null,
)(ProfilesWrapper);
