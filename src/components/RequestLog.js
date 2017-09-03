import React, { Component } from "react";

class RequestLog extends Component {
  render() {
    const { logs } = this.props.data;

    return (
      <box top={0} height="100%-2" left={0} width="100%-2" scrollable={true} mouse={true}>
        {logs.join("\n")}
      </box>
    );
  }
}

export default RequestLog;
