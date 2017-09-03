#!/usr/bin/env node

const commander = require("commander");
const spawn = require("cross-spawn");

const main =
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "dmy" ? require("../src/main") : require("../lib/main");
const pkg = require("../package.json");
const program = new commander.Command("rails-dashboard");
const helper = require("./helper");
const updateCheck = require("./self-update-checker");

program.version(pkg.version);
// program.option("-c, --color [color]", "Dashboard color");
program.usage("[options] -- [rails command] [arguments]");
program.on("--help", helper);
program.parse(process.argv);

const command = program.args[0];
const args = program.args.slice(1);

const child = spawn(command, args, {
  stdio: [null, null, null, null],
  detached: true
});

let messages = [];

process.on("warning", data => {
  messages.push(data.message);
  process.exit(0);
});

let selfVersionCheck = [];
setImmediate(updateCheck, pkg.version, selfVersionCheck);

process.on("exit", () => {
  if (messages.length) console.log(messages.join("\n"));
  if (selfVersionCheck.length) console.log(selfVersionCheck.join("\n"));

  try {
    process.kill(process.platform === "win32" ? child.pid : -child.pid);
  } catch (e) {
    // throw. because if rails failed booting, child process is not exists
  }
});

main(child);
