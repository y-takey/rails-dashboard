import React, { Component } from "react";

const style = { fg: "white", border: { fg: "white" } };

class RequestDetail extends Component {
  render() {
    const { top, height, data: { params, activeRecords, renderings } } = this.props;
    return (
      <box top={top} height={height} left="0" width="100%">
        <box left={0} width={14}>
          <text top={0} left={0} width={13} style={{ bg: "cyan" }}>
            Params
          </text>
          <text top={1} left={0} width={13} content="ActiveRecords" />
        </box>
        <box top={0} left={14} width="100%-14" label="Detail" border={{ type: "line" }} style={style}>
          <box left={0} width="20%">
            {params[0].value}
          </box>
          <box left="20%" width="80%-2">
            {activeRecords[0].sql}
          </box>
        </box>
      </box>
    );
  }
}

export default RequestDetail;
