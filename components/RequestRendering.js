import _ from "lodash";
import React, { Component } from "react";
import StyledRow from "./StyledRow";

const typeStyle = { fg: "magenta", bold: true, align: "right" };
const durationStyle = { fg: "yellow" };
const durationHeaderStyle = { fg: "yellow" };
const viewHeaderStyle = { fg: "magenta" };

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return `${str.padStart(7)} ms`;
};

const containerStyle = {
  padding: { top: 1, left: 2, right: 2 }
};

class RequestRendering extends Component {
  render() {
    const { renderingTime, renderings } = this.props.data;
    const maxViewLength = _.max(renderings.map(({ view }) => view.length));

    return (
      <box top={0} height="100%-2" left={0} width="100%-6" {...containerStyle}>
        <StyledRow
          top={0}
          columns={["Total", format(renderingTime), `${renderings.length} View`]}
          styles={[{ width: maxViewLength, align: "right" }, durationHeaderStyle, viewHeaderStyle]}
        />

        <StyledRow top={1} columns={["================"]} styles={[{ fg: "white" }]} />

        {renderings.map(({ view, duration }, i) =>
          <StyledRow
            key={`styledrow-${i}`}
            top={i + 2}
            columns={[view, format(duration)]}
            styles={[{ width: maxViewLength, ...typeStyle }, durationStyle]}
          />
        )}
      </box>
    );
  }
}

export default RequestRendering;
