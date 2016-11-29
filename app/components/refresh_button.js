import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

const RefreshButton = (props) => {
  const { dispatch } = props;

  return (
    <button onClick={() => dispatch(actions.refreshToken())}>Refresh token</button>
  );
};

export default connect()(RefreshButton);
