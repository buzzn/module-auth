import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import constants from '../constants';

const PasswordSignIn = (props) => {
  const { dispatch, login, password } = props;

  return (
    <div>
      <input value={login} onChange={(event) => dispatch(actions.setLogin(event.target.value))} type="text" />
      <input value={password} onChange={(event) => dispatch(actions.setPassword(event.target.value))} type="password" />
      <button onClick={() => dispatch(actions.startAuth())}>Sign in</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    password: state.auth.password,
  };
}

export default connect(mapStateToProps)(PasswordSignIn);
