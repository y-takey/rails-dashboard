import React, { Component } from "react";

const labelStyle = { fg: "magenta", bold: true };

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return `${str.padStart(7)} ms`;
};

function separate(num) {
  return;
}

class RequestBreakdown extends Component {
  render() {
    const { respTime, sqlTime, renderingTime } = this.props.data;

    return (
      <box top={0} height="100%-2" left={0} width="100%-2">
        <box top={1} height={1} left={0} width={19} content="   Response Time : " style={labelStyle} />
        <box top={1} height={1} left={19} width="100%-19" content={format(respTime)} />
        <box top={2} height={1} left={0} width={29} content="  ===========================" />
        <box top={3} height={1} left={0} width={19} content="        SQL Time : " style={labelStyle} />
        <box top={3} height={1} left={19} width="100%-19" content={format(sqlTime)} />
        <box top={4} height={1} left={0} width={19} content="  Rendering Time : " style={labelStyle} />
        <box top={4} height={1} left={19} width="100%-19" content={format(renderingTime)} />
        <box top={5} height={1} left={0} width={19} content="          Others : " style={labelStyle} />
        <box top={5} height={1} left={19} width="100%-19" content={format(respTime - sqlTime - renderingTime)} />
      </box>
    );
  }
}

export default RequestBreakdown;
