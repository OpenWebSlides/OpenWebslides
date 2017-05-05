import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { oauthSigninUser } from 'actions/signinActions';

class oAuthCallback extends Component {
  componentDidMount() {
    const authToken = this.props.location.query.token;
    this.props.OAuthSigninUser({ authToken });
  }

  render() {
    if (this.props.isAuthenticated) {
      browserHistory.push('/');
    }

    return (
      <div>
        <h4>Authenticating...</h4>
      </div>
    );
  }
}

oAuthCallback.propTypes = {
  location: PropTypes.objectOf(Object),
  OAuthSigninUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

oAuthCallback.defaultProps = {
  location: { query: '' },
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.local.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ oauthSigninUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(oAuthCallback);
