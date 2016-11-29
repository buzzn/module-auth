import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

const SignOutButton = (props) => {
  const { dispatch } = props;

  return (
    <button onClick={() => dispatch(actions.signOut())}>Sign out</button>
  );
};

export default connect()(SignOutButton);
