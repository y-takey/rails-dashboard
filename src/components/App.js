import _ from "lodash";
import events from "events";
import React, { Component } from "react";
import LogListener from "../LogListener";
import Booting from "./Booting";
import ServerInfo from "./ServerInfo";
import RequestList from "./RequestList";
import RequestDetail from "./RequestDetail";

const eventEmitter = new events.EventEmitter();

const dmyServerInfo = {
  webServer: "Puma",
  railsVersion: "5.1.2",
  url: "http://localhost:3000",
  webServerVersion: "3.9.2",
  rubyVersion: "2.2.1p100"
};

const containerOptions = {
  vi: true,
  keys: true,
  scrollable: true,
  mouse: true,
  focused: true,
  width: "100%"
};

const initialState = {
  serverInfo: null,
  requests: [],
  selectedIndex: 0,
  showDetail: false,
  detailMode: "breakdown",
  currentRangeStart: 0,
  maxRow: 1,
  halfRow: 1,
  currentRow: 1
};

const allRequests = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    ["onRailsStarted", "onRailsRequested", "onKeypress", "setMaxRow"].forEach(
      func => (this[func] = this[func].bind(this))
    );

    eventEmitter.on("started", this.onRailsStarted);
    eventEmitter.on("requested", this.onRailsRequested);
  }

  componentDidMount() {
    const listener = new LogListener(eventEmitter);
    this.props.railsProc.stdout.on("data", listener.stdout);
    this.props.railsProc.stderr.on("data", listener.stderr);
    this.setMaxRow();
  }

  onRailsStarted(serverInfo) {
    this.setState({ serverInfo });
  }

  onRailsRequested(data) {
    allRequests.push(data);
    const { selectedIndex, showDetail } = this.state;

    if (selectedIndex === allRequests.length - 2) {
      this.setState({ selectedIndex: allRequests.length - 1 });
    }
    this.setDisplayRange();
  }

  moveIndex(amount) {
    let nextIndex = this.state.selectedIndex + amount;
    let maxIndex = allRequests.length - 1;

    if (nextIndex < 0) {
      nextIndex = 0;
    } else if (nextIndex > maxIndex) {
      nextIndex = maxIndex;
    }

    this.setState({ selectedIndex: nextIndex });
    this.setDisplayRange();
  }

  changeMode(mode) {
    if (allRequests.length === 0) return;

    this.setState({ showDetail: true, detailMode: mode });
    this.setDisplayRange();
  }

  showDetail(enable) {
    this.setState({ showDetail: enable });
    this.setDisplayRange();
  }

  setMaxRow() {
    const maxRow = process.stdout.rows - 3;
    this.setState({ maxRow, halfRow: Math.floor(maxRow / 2) - 1 });
    this.setDisplayRange();
  }

  keyFunc(key) {
    if (!this._keyMap) {
      let up = _.partial(this.moveIndex, -1).bind(this);
      let down = _.partial(this.moveIndex, 1).bind(this);

      this._keyMap = {
        down,
        up,
        j: down,
        k: up,
        b: _.partial(this.changeMode, "breakdown").bind(this),
        p: _.partial(this.changeMode, "params").bind(this),
        a: _.partial(this.changeMode, "activerecord").bind(this),
        r: _.partial(this.changeMode, "rendering").bind(this),
        enter: _.partial(this.showDetail, true).bind(this),
        escape: _.partial(this.showDetail, false).bind(this)
      };
    }
    return this._keyMap[key];
  }

  onKeypress(_char, key) {
    const func = this.keyFunc(key.name);
    if (func) func();
  }

  setDisplayRange() {
    const { selectedIndex, showDetail, maxRow, halfRow, currentRangeStart } = this.state;
    const currentRow = showDetail ? halfRow : maxRow;
    let nextRangeStart;

    if (selectedIndex < currentRangeStart) {
      nextRangeStart = selectedIndex;
    } else if (selectedIndex >= currentRangeStart + currentRow) {
      nextRangeStart = selectedIndex - currentRow + 1;
    } else {
      nextRangeStart = currentRangeStart;
    }
    const requests = allRequests.slice(nextRangeStart, nextRangeStart + currentRow);

    this.setState({ requests, currentRow, currentRangeStart: nextRangeStart });
  }

  render() {
    const { serverInfo, requests, showDetail, detailMode, selectedIndex, currentRow, halfRow } = this.state;

    if (!serverInfo) return <Booting />;

    const selectedData = allRequests[selectedIndex] || {};
    const detailProps = {
      top: halfRow + 3,
      height: `100%-${halfRow + 3}`,
      data: selectedData,
      mode: detailMode
    };

    return (
      <box {...containerOptions} onKeypress={this.onKeypress} onResize={this.setMaxRow}>
        <ServerInfo top={0} height={1} {...serverInfo} />
        <RequestList top={1} height={currentRow} data={requests} selectedKey={selectedData.date} />
        {showDetail && <RequestDetail {...detailProps} />}
      </box>
    );
  }
}

export default App;