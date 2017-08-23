import _ from "lodash";
import React, { Component } from "react";
import StyledRow from "./StyledRow";

const header = ["date", "status", "method", "url"];

const containerOptions = {
  ref: "table",
  border: { type: "line" },
  width: "100%",
  // padding: { left: 1, right: 1 },
  style: { border: { fg: "white" } }
};

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return `${str} ms`.padStart(WIDTHS.respTime);
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

  const cols = _.map(WIDTHS, (width, key) => (width ? padded[key].padEnd(width).substr(0, width) : padded[key]));

  return isSelected ? [cols.join(" ")] : cols;
};

const styles = (status, isSelected) => {
  if (isSelected) return [{ bg: "cyan", fg: "white" }];

  return [
    { bg: "", fg: "blue" },
    { bg: "", fg: StatusColors[status[0]] },
    { bg: "", fg: "white" },
    { bg: "", fg: "white" },
    { bg: "", fg: "magenta" },
    { bg: "", fg: "white" },
    { bg: "", fg: "" }
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
    const { top, height, data, selectedNo } = this.props;

    return (
      <box top={top} height={height + 2} {...containerOptions}>
        <box height="100%-2" width="100%-2">
          {data.map((record, i) => row(record, i, selectedNo))}
        </box>
      </box>
    );
  }
}

export default RequestList;
