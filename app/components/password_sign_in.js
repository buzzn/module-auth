import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import constants from '../constants';

const PasswordSignIn = (props) => {
  const { dispatch, username, password } = props;

  return (
    <div>
      <input value={username} onChange={(event) => dispatch(actions.setUsername(event.target.value))} type="text" />
      <input value={password} onChange={(event) => dispatch(actions.setPassword(event.target.value))} type="password" />
      <button onClick={() => dispatch(actions.startAuth(constants.PASSWORD_FLOW))}>Sign in</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    password: state.auth.password,
  };
}

export default connect(mapStateToProps)(PasswordSignIn);
