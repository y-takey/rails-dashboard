import React, { Component } from "react";

class ServerInfo extends Component {
  render() {
    const { webServer, railsVersion, url, webServerVersion, rubyVersion } = this.props;
    return (
      <box top="0" left="0" height={1} width="100%" style={{ fg: "white", bg: "blue" }}>
        Rails:{railsVersion} Ruby:{rubyVersion} WebServer:{webServer}({webServerVersion}) {url}
      </box>
    );
  }
}

export default ServerInfo;
