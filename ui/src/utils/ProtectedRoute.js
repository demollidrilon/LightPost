import React, { Component } from "react";
import * as auth from "./Auth";

export default function (ComposedComponent) {
  class Authenticate extends Component {
    async componentDidMount() {
      if (!auth.isLoggedIn()) {
        this.props.history.push("/");
      }
    }

    componentDidUpdate(nextProps, prevState, snapshot) {
      if (!auth.isLoggedIn()) {
        this.props.history.push("/");
      }
    }

    render() {
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
  return Authenticate;
}
