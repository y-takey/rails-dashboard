#!/usr/bin/env node

import React from "react";
import { render } from "react-blessed";
import commander from "commander";
import spawn from "cross-spawn";

import App from "../components/App";
import screen from "../components/screen";

const pkg = require("../package.json");
const program = new commander.Command("rails-dashboard");

program.version(pkg.version);
program.option("-c, --color [color]", "Dashboard color");
program.option("-m, --minimal", "Minimal mode");
program.option("-t, --title [title]", "Terminal window title");
program.option("-p, --port [port]", "Socket listener port");
program.usage("[options] -- [script] [arguments]");
program.parse(process.argv);

const command = program.args[0];
const args = program.args.slice(1);

const child = spawn(command, args, {
  stdio: [null, null, null, null],
  detached: true
});

process.on("exit", () => {
  process.kill(process.platform === "win32" ? child.pid : -child.pid);
});

render(<App railsProc={child} />, screen);
