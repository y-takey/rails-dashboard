import _ from "lodash";
import React, { Component } from "react";
import StyledRow from "./StyledRow";

const header = ["date", "status", "method", "url"];

const containerOptions = {
  ref: "table",
  mouse: false,
  border: { type: "line" },
  width: "100%",
  // padding: { left: 1, right: 1 },
  style: { border: { fg: "white" } }
};

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return _.padStart(`${str} ms`, WIDTHS.respTime);
};

const WIDTHS = {
  date: 14,
  status: 3,
  method: 6,
  format: 4,
  respTime: 10,
  processor: 30,
  url: null
};

const StatusColors = { 2: "green", 3: "blue", 4: "yellow", 5: "red" };

const columns = (data, isSelected) => {
  const padded = _.extend({}, data, { respTime: format(data.respTime) });

  const cols = _.map(WIDTHS, (width, key) => (width ? _.padEnd(padded[key], width).substr(0, width) : padded[key]));

  return isSelected ? [cols.join(" ")] : cols;
};

const styles = (status, isSelected) => {
  if (isSelected) return [{ bg: "cyan", fg: "white", bold: true }];

  return [
    { bg: "", fg: "blue", bold: false },
    { bg: "", fg: StatusColors[status[0]], bold: true },
    { bg: "", fg: "white", bold: false },
    { bg: "", fg: "white", bold: false },
    { bg: "", fg: "magenta", bold: false },
    { bg: "", fg: "white", bold: false },
    { bg: "", fg: "", bold: false }
  ];
};

const row = (data, i, selectedNo) => {
  const isSelected = i === selectedNo;

  return (
    <StyledRow
      key={`styled-request-${i}`}
      top={i}
      columns={columns(data, isSelected)}
      styles={styles(data.status, isSelected)}
    />
  );
};

class RequestList extends Component {
  render() {
    const { top, height, onKeypress, showDetail, data, selectedNo } = this.props;

    return (
      <box
        top={top}
        keys={!showDetail}
        height={height + 2}
        scrollable={!showDetail}
        onKeypress={onKeypress}
        focused={!showDetail}
        {...containerOptions}
      >
        <box height="100%-2" width="100%-2">
          {data.map((record, i) => row(record, i, selectedNo))}
        </box>
      </box>
    );
  }
}

export default RequestList;
