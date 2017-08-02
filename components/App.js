import events from "events";
import React, { Component } from "react";
import LogListener from "../lib/LogListener";
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { serverInfo: null, requests: [] };

    this.onRailsStarted = this.onRailsStarted.bind(this);
    this.onRailsRequested = this.onRailsRequested.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onKeyEsc = this.onKeyEsc.bind(this);
    this.onKeyP = this.onKeyP.bind(this);

    eventEmitter.on("started", this.onRailsStarted);
    eventEmitter.on("requested", this.onRailsRequested);
  }

  componentDidMount() {
    const listener = new LogListener(eventEmitter);
    this.props.railsProc.stdout.on("data", listener.stdout);
    this.props.railsProc.stderr.on("data", listener.stderr);
  }

  onRailsStarted(serverInfo) {
    this.setState({ serverInfo });
  }

  onRailsRequested(data) {
    this.setState({ requests: [data, ...this.state.requests] });
  }

  onSelectRow(_any, selectedIndex) {
    this.setState({ selectedIndex });
  }

  onKeyEsc() {
    this.setState({ selectedIndex: null });
  }

  onKeyP() {
    this.setState({ detailMode: "params" });
  }

  render() {
    const { serverInfo, requests, selectedIndex } = this.state;
    const listHeight = selectedIndex ? "50%-1" : "100%-1";

    return (
      <box>
        {serverInfo && <ServerInfo top={0} height={1} {...serverInfo} />}
        <RequestList
          top={1}
          height={listHeight}
          selected={selectedIndex}
          onSelect={this.onSelectRow}
          onKeyEscape={this.onKeyEsc}
          onKeyP={this.onKeyP}
          data={requests}
        />
        {selectedIndex && <RequestDetail top="50%" height="50%" data={requests[selectedIndex - 1]} />}
      </box>
    );
  }
}

export default App;
