import events from "events";
import React, { Component } from "react";
import LogListener from "../lib/LogListener";
import ServerInfo from "./ServerInfo";

const eventEmitter = new events.EventEmitter();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { msg: "setup", serverInfo: null };

    eventEmitter.on("started", this.onRailsStarted.bind(this));
  }

  componentDidMount() {
    const listener = new LogListener(eventEmitter);
    this.props.railsProc.stdout.on("data", listener.stdout);
    this.props.railsProc.stderr.on("data", listener.stderr);
  }

  onRailsStarted(envinfo) {
    this.setState({ serverInfo: envinfo });
  }

  render() {
    const { serverInfo } = this.state;
    const server = serverInfo ? <ServerInfo {...serverInfo} /> : null;
    return (
      <box>
        {server}
        {this.state.msg}
      </box>
    );
  }
}

export default App;
