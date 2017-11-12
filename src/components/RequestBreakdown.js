import React, { Component } from "react";
import formatter from "../formatter";

const labelStyle = { fg: "magenta", bold: true };

class RequestBreakdown extends Component {
  scroll(amount) {
    // nope
  }

  render() {
    const { respTime, sqlTime, renderingTime } = this.props.data;

    return (
      <box top={0} height="100%-2" left={0} width="100%-2">
        <box top={1} height={1} left={0} width={19} content="   Response Time : " style={labelStyle} />
        <box top={1} height={1} left={19} width="100%-19" content={formatter.ms(respTime)} />
        <box top={2} height={1} left={0} width={29} content="  ===========================" />
        <box top={3} height={1} left={0} width={19} content="        SQL Time : " style={labelStyle} />
        <box top={3} height={1} left={19} width="100%-19" content={formatter.ms(sqlTime)} />
        <box top={4} height={1} left={0} width={19} content="  Rendering Time : " style={labelStyle} />
        <box top={4} height={1} left={19} width="100%-19" content={formatter.ms(renderingTime)} />
        <box top={5} height={1} left={0} width={19} content="          Others : " style={labelStyle} />
        <box top={5} height={1} left={19} width="100%-19" content={formatter.ms(respTime - sqlTime - renderingTime)} />
      </box>
    );
  }
}

export default RequestBreakdown;
