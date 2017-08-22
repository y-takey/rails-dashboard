import React from "react";
import { render } from "react-blessed";
import App from "./components/App";
import screen from "./screen";

const main = railsProc => {
  render(<App railsProc={railsProc} />, screen);
};

module.exports = main;
