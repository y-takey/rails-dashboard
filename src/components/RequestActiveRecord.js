import _ from "lodash";
import React, { Component } from "react";
import StyledRow from "./StyledRow";
import formatter from "../formatter";

const typeStyle = { fg: "magenta", bold: true, align: "right" };
const durationStyle = { fg: "yellow" };
const sqlStyle = {};
const durationHeaderStyle = { fg: "yellow" };
const sqlHeaderStyle = { fg: "magenta" };

const containerStyle = {
  padding: { top: 1, left: 2, right: 2 }
};

class RequestActiveRecord extends Component {
  scroll(amount) {
    // nope
  }

  render() {
    const { sqlTime, activeRecords } = this.props.data;
    const maxTypeLength = _.max(activeRecords.map(({ type }) => type.length)) || 7;
    let othersTime = sqlTime - _.sumBy(activeRecords, "duration");
    if (othersTime < 0) othersTime = 0;

    return (
      <text top={0} height="100%-2" left={0} width="100%-6" {...containerStyle}>
        <StyledRow
          top={0}
          columns={["Total ", formatter.ms(sqlTime), `${activeRecords.length} SQL`]}
          styles={[{ width: maxTypeLength, align: "right" }, durationHeaderStyle, sqlHeaderStyle]}
        />

        <StyledRow top={1} columns={["=".repeat(maxTypeLength + 11)]} styles={[{ fg: "white" }]} />

        {activeRecords.map(({ type, duration, sql }, i) =>
          <StyledRow
            key={`styledrow-${i}`}
            top={i + 2}
            columns={[type, formatter.ms(duration), sql]}
            styles={[{ width: maxTypeLength, ...typeStyle }, durationStyle, sqlStyle]}
          />
        )}

        <StyledRow
          top={2 + activeRecords.length}
          columns={["Others ", formatter.ms(othersTime)]}
          styles={[{ width: maxTypeLength, ...typeStyle }, durationStyle]}
        />
      </text>
    );
  }
}

export default RequestActiveRecord;
