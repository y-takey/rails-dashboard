import _ from "lodash";
import React, { Component } from "react";
import RequestBreakdown from "./RequestBreakdown";
import RequestParams from "./RequestParams";
import RequestActiveRecord from "./RequestActiveRecord";
import RequestRendering from "./RequestRendering";
import RequestLog from "./RequestLog";

const boxStyle = { fg: "white", border: { fg: "white" } };
const tabStyle = { bg: "", fg: "white" };
const selectedTabStyle = { bg: "cyan", fg: "white", bold: true };

const items = [
  { key: "breakdown", label: " Breakdown [b] ", component: RequestBreakdown },
  { key: "params", label: " Params [p] ", component: RequestParams },
  { key: "activerecord", label: " ActiveRecord [a] ", component: RequestActiveRecord },
  { key: "rendering", label: " Rendering [r] ", component: RequestRendering },
  { key: "log", label: " Log [l] ", component: RequestLog }
];

const itemSize = _.max(_.map(items, item => item.label.length));

class RequestDetail extends Component {
  scroll(amount) {
    this.refs.detail.scroll(amount);
  }

  renderTabs(left, mode) {
    const ret = [];
    items.forEach((item, i) => {
      const style = item.key === mode ? selectedTabStyle : tabStyle;
      ret.push(
        <text key={`tab-${i}`} left={left + (itemSize + 1) * i} width={itemSize} content={item.label} style={style} />
      );
      ret.push(<text key={`sep-${i}`} left={left + (itemSize + 1) * (i + 1) - 1} width={1} content="|" />);
    });
    return ret;
  }

  renderDetail(mode, data) {
    const targetItem = _.find(items, item => item.key === mode);
    return <targetItem.component data={data} ref="detail" />;
  }

  render() {
    const { top, height, mode, onKeypress, data } = this.props;
    const { params, activeRecords, renderings } = data;

    return (
      <box top={top} height={height} left="0" width="100%">
        <text
          top={0}
          height="100%"
          left={0}
          width="100%"
          border={{ type: "line" }}
          style={boxStyle}
          focused={true}
          scrollable={true}
          mouse={false}
          keys={true}
          onKeypress={onKeypress}
        >
          {this.renderDetail(mode, data)}
        </text>
        <box top={0} height={1} left={2} width={itemSize * items.length + items.length + 1}>
          |{this.renderTabs(1, mode)}
        </box>
      </box>
    );
  }
}

export default RequestDetail;
