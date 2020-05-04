import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShowProfile2 } from 'applications/personalization/profile-2/selectors';

import ProfileWrapper from 'applications/personalization/profile-2/components/ProfileWrapper';
import ProfileOneWrapper from 'applications/personalization/profile360/containers/VAProfileApp';

class ProfileWrapperTest extends Component {
  render() {
    console.log('I am in ProfileWrapperTest', this.props);
    const { showProfile2 } = this.props;
    return <>{showProfile2 ? <ProfileWrapper /> : <ProfileOneWrapper />}</>;
  }
}

const mapStateToProps = state => ({
  showProfile2: selectShowProfile2(state),
});

export default connect(
  mapStateToProps,
  null,
)(ProfileWrapperTest);
