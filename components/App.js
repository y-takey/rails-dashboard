import _ from 'lodash';
import events from 'events';
import React, { Component } from 'react';
import LogListener from '../lib/LogListener';
import ServerInfo from './ServerInfo';
import RequestList from './RequestList';
import RequestDetail from './RequestDetail';

const eventEmitter = new events.EventEmitter();

const dmyServerInfo = {
  webServer: 'Puma',
  railsVersion: '5.1.2',
  url: 'http://localhost:3000',
  webServerVersion: '3.9.2',
  rubyVersion: '2.2.1p100'
};

const containerOptions = {
  vi: true,
  keys: true,
  scrollable: true,
  mouse: true,
  focused: true
};

const initialState = {
  serverInfo: null,
  requests: [],
  selectedNo: null,
  showDetail: false,
  detailMode: 'breakdown'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.onRailsStarted = this.onRailsStarted.bind(this);
    this.onRailsRequested = this.onRailsRequested.bind(this);
    this.onKeypress = this.onKeypress.bind(this);

    eventEmitter.on('started', this.onRailsStarted);
    eventEmitter.on('requested', this.onRailsRequested);
  }

  componentDidMount() {
    const listener = new LogListener(eventEmitter);
    this.props.railsProc.stdout.on('data', listener.stdout);
    this.props.railsProc.stderr.on('data', listener.stderr);
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

  moveIndex(amount) {
    let nextNo = this.state.selectedNo + amount;
    let maxNo = this.state.requests.length;

    if (nextNo < 1) {
      nextNo = 1;
    } else if (nextNo > maxNo) {
      nextNo = maxNo;
    }

    this.setState({ selectedNo: nextNo });
  }

  changeMode(mode) {
    this.setState({ showDetail: true, detailMode: mode });
  }

  showDetail(enable) {
    this.setState({ showDetail: enable });
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
        b: _.partial(this.changeMode, 'breakdown').bind(this),
        p: _.partial(this.changeMode, 'params').bind(this),
        a: _.partial(this.changeMode, 'activerecord').bind(this),
        r: _.partial(this.changeMode, 'rendering').bind(this),
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

  render() {
    const { serverInfo, requests, showDetail, detailMode, selectedNo } = this.state;
    const showable = showDetail && selectedNo;
    const listHeight = showable ? '50%-1' : '100%-1';
    const detailProps = {
      top: '50%+1',
      height: '50%',
      data: requests[selectedNo - 1],
      mode: detailMode
    };

    return (
      <box {...containerOptions} onKeypress={this.onKeypress}>
        {serverInfo && <ServerInfo top={0} height={1} {...serverInfo} />}
        <RequestList top={1} height={listHeight} data={requests} />
        {showable && <RequestDetail {...detailProps} />}
      </box>
    );
  }
}

export default App;
