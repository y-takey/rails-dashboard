import React, { Component } from "react";

class RequestLog extends Component {
  render() {
    const { logs } = this.props.data;

    return <text content={logs.join("\n")} />;
  }
}

export default RequestLog;
