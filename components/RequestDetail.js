import _ from "lodash";
import React, { Component } from "react";
import RequestBreakdown from "./RequestBreakdown";
import RequestParams from "./RequestParams";
import RequestActiveRecord from "./RequestActiveRecord";
import RequestRendering from "./RequestRendering";

const style = { fg: "white", border: { fg: "white" } };

const items = [
  { key: "breakdown", label: " Breakdown [b] ", component: RequestBreakdown },
  { key: "params", label: " Params [p] ", component: RequestParams },
  { key: "activerecord", label: " ActiveRecord [a] ", component: RequestActiveRecord },
  { key: "rendering", label: " Rendering [r] ", component: RequestRendering }
];

const itemSize = _.max(_.map(items, item => item.label.length));

class RequestDetail extends Component {
  renderTabs(left, mode) {
    const ret = [];
    const foo = items.forEach((item, i) => {
      const style = item.key === mode ? { bg: "cyan" } : { bg: "" };
      ret.push(
        <text key={`tab-${i}`} left={left + (itemSize + 1) * i} width={itemSize} content={item.label} style={style} />
      );
      ret.push(<text key={`sep-${i}`} left={left + (itemSize + 1) * (i + 1) - 1} width={1} content="|" />);
    });
    return ret;
  }

  renderDetail(mode, data) {
    const foo = _.find(items, item => item.key === mode);
    return <foo.component data={data} />;
  }

  render() {
    const { top, height, mode, data } = this.props;
    const { params, activeRecords, renderings } = data;

    return (
      <box top={top} height={height} left="0" width="100%">
        <box top={0} height="100%" left={0} width="100%" border={{ type: "line" }} style={style}>
          {this.renderDetail(mode, data)}
        </box>
        <box top={0} height={1} left={2} width={itemSize * items.length + items.length + 1}>
          |{this.renderTabs(1, mode)}
        </box>
      </box>
    );
  }
}

export default RequestDetail;
