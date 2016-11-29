import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import constants from '../constants';

const ImplicitSignInButton = (props) => {
  const { dispatch } = props;

  return (
    <button onClick={() => dispatch(actions.startAuth(constants.IMPLICIT_FLOW))}>Sign in</button>
  );
};

export default connect()(ImplicitSignInButton);
