import _ from "lodash";
import React, { Component } from "react";

const labelStyle = { fg: "magenta", bold: true };
const durationStyle = { fg: "yellow" };

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return `${str.padStart(7)} ms`;
};

class RequestActiveRecord extends Component {
  render() {
    const { sqlTime, activeRecords } = this.props.data;
    const maxTypeLength = _.max(activeRecords.map(({ type }) => type.length)) + 1;

    return (
      <box top={0} height="100%-2" left={0} width="100%-2">
        Total {format(sqlTime)}, {activeRecords.length} SQL
        {activeRecords.map(({ type, sql, duration }, i) => {
          return [
            <box
              top={i + 1}
              height={1}
              left={0}
              width={maxTypeLength}
              content={type.padStart(maxTypeLength)}
              style={labelStyle}
            />,
            <box
              top={i + 1}
              height={1}
              left={maxTypeLength + 1}
              width={10}
              content={format(duration)}
              style={durationStyle}
            />,
            <box top={i + 1} height={1} left={maxTypeLength + 11} width={`100%-${maxTypeLength + 11}`} content={sql} />
          ];
        })}
      </box>
    );
  }
}

export default RequestActiveRecord;
