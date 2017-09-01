#!/usr/bin/env node

const commander = require("commander");
const spawn = require("cross-spawn");

const main =
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "dmy" ? require("../src/main") : require("../lib/main");
const pkg = require("../package.json");
const program = new commander.Command("rails-dashboard");

program.version(pkg.version);
// program.option("-c, --color [color]", "Dashboard color");
program.usage("[options] -- [rails command] [arguments]");
program.on("--help", () => {
  [
    "",
    "  Examples:",
    "",
    "    $ rails-dashboard bin/rails s",
    "",
    "  Key Map:",
    "",
    "    # Cursor navigation",
    "        <j> or <Down> : move down by 1 row",
    "          <k> or <Up> : move up by 1 row",
    "              <Space> : move down by 1 page",
    "    <Shift> + <Space> : move up by 1 page",
    "                  <g> : move to top",
    "        <Shift> + <g> : move to bottom",
    "    # View manipulation",
    "              <Enter> : show detail about selected row",
    "             <Escape> : hide the detail",
    "                  <b> : show detail with Breakdown tab",
    "                  <p> : show detail with Params tab",
    "                  <a> : show detail with ActiveRecord tab",
    "                  <r> : show detail with Rendering tab",
    "                  <l> : show detail with Log tab"
  ].forEach(line => console.log(line));
});
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

process.on("exit", () => {
  if (messages.length) console.log(messages.join("\n"));
  try {
    process.kill(process.platform === "win32" ? child.pid : -child.pid);
  } catch (e) {
    // throw. because if rails failed booting, child process is not exists
  }
});

main(child);
