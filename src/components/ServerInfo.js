import React, { Component } from "react";

const style = { fg: "white", bg: "blue" };

class ServerInfo extends Component {
  render() {
    const { top, height, webServer, railsVersion, url, webServerVersion, rubyVersion } = this.props;
    return (
      <box top={top} height={height} left="0" width="100%" style={style}>
        Rails:{railsVersion} Ruby:{rubyVersion} WebServer:{webServer}({webServerVersion}) {url}
      </box>
    );
  }
}

export default ServerInfo;
