import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        auth !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/error",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
