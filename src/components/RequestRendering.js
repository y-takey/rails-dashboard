import _ from "lodash";
import React, { Component } from "react";
import StyledRow from "./StyledRow";
import formatter from "../formatter";

const typeStyle = { fg: "magenta", bold: true, align: "right" };
const durationStyle = { fg: "yellow" };
const durationHeaderStyle = { fg: "yellow" };
const viewHeaderStyle = { fg: "magenta" };

const containerStyle = {
  padding: { top: 1, left: 2, right: 2 }
};

class RequestRendering extends Component {
  scroll(amount) {
    // nope
  }

  render() {
    const { renderingTime, renderings } = this.props.data;
    const maxViewLength = _.max(renderings.map(({ view }) => view.length)) || 7;
    let othersTime = renderingTime - _.sumBy(renderings, "duration");
    if (othersTime < 0) othersTime = 0;

    return (
      <text top={0} height="100%-2" left={0} width="100%-6" {...containerStyle}>
        <StyledRow
          top={0}
          columns={["Total", formatter.ms(renderingTime), `${renderings.length} View`]}
          styles={[{ width: maxViewLength, align: "right" }, durationHeaderStyle, viewHeaderStyle]}
        />

        <StyledRow top={1} columns={["=".repeat(maxViewLength + 11)]} styles={[{ fg: "white" }]} />

        {renderings.map(({ view, duration }, i) =>
          <StyledRow
            key={`styledrow-${i}`}
            top={i + 2}
            columns={[view, formatter.ms(duration)]}
            styles={[{ width: maxViewLength, ...typeStyle }, durationStyle]}
          />
        )}

        <StyledRow
          top={2 + renderings.length}
          columns={["Others", formatter.ms(othersTime)]}
          styles={[{ width: maxViewLength, ...typeStyle }, durationStyle]}
        />
      </text>
    );
  }
}

export default RequestRendering;
