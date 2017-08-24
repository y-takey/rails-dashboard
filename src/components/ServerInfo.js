import React, { Component } from "react";

const style = { fg: "white", bg: "blue" };

class ServerInfo extends Component {
  render() {
    const { top, height, webServer, railsVersion, url, webServerVersion, rubyVersion } = this.props;
    const content = `Rails: ${railsVersion}   Ruby: ${rubyVersion}   ${webServer}: ${webServerVersion}   on ${url}`;
    return <box top={top} height={height} left="0" width="100%" style={style} content={content} />;
  }
}

export default ServerInfo;
