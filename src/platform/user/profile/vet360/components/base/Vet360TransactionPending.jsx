import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { profileShowReceiveTextNotifications } from 'applications/personalization/profile360/selectors';

class Vet360TransactionPending extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    refreshTransaction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.interval = window.setInterval(this.props.refreshTransaction, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    if (this.props.children) {
      return <div>{this.props.children}</div>;
    }

    let content = (
      <span>
        We’re working on saving your new {this.props.title.toLowerCase()}. We’ll
        show it here once it’s saved.
      </span>
    );

    if (
      this.props.showReceiveTextNotifications &&
      this.props.title.toLowerCase() === 'mobile phone number'
    ) {
      content = (
        <span>
          We’re working on saving your new {this.props.title.toLowerCase()} and
          text alert preference. They will show on your profile once they've
          been updated.
        </span>
      );
    }

    if (this.props.method === 'DELETE') {
      content = (
        <span>
          We’re in the process of deleting your {this.props.title.toLowerCase()}
          . We’ll remove this information soon.
        </span>
      );
    }

    return (
      <div
        data-transaction-pending
        className="vet360-profile-field-transaction-pending"
      >
        {content}
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    showReceiveTextNotifications: profileShowReceiveTextNotifications(state),
  };
}

export default connect(
  mapStateToProps,
  null,
)(Vet360TransactionPending);

export { Vet360TransactionPending };
