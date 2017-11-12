import React, { Component } from "react";

class RequestLog extends Component {
  scroll(amount) {
    this.refs.container.scroll(amount);
    this.forceUpdate();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      this.refs.container.scrollTo(0);
    }
  }

  render() {
    const { logs } = this.props.data;

    return <text scrollable={true} ref="container" content={logs.join("\n")} />;
  }
}

export default RequestLog;
