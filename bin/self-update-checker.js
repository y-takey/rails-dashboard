const _ = require("lodash");
const chalk = require("chalk");
const request = require("request");
const options = {
  uri: "https://npmcdn.com/rails-dashboard@latest",
  timeout: 2000,
  followRedirect: false
};

const npmUpdate = "npm update -g rails-dashboard";
const yarnUpdate = "yarn global upgrade rails-dashboard";
const width = 45;

const box = {
  top() {
    return chalk.yellow(["╭", "─".repeat(width), "╮"].join(""));
  },
  middle(str) {
    return [chalk.yellow("│"), _.padEnd(str, width), chalk.yellow("│")].join("");
  },
  bottom() {
    return chalk.yellow(["╰", "─".repeat(width), "╯"].join(""));
  }
};

// e.g.)
// ╭─────────────────────────────────────────────╮
// │                                             │
// │  Update available 0.1.1 -> 0.1.2            │
// │    Run npm update -g rails-dashboard        │
// │     or yarn global upgrade rails-dashboard  │
// │     to update                               │
// │                                             │
// ╰─────────────────────────────────────────────╯
const messageGenerator = (prevVer, nextVer) => {
  return [
    box.top(),
    box.middle(""),
    box.middle(`  Update available ${chalk.gray(prevVer)} -> ${chalk.green(nextVer)}            `),
    box.middle(`    Run ${chalk.cyan.bold(npmUpdate)}        `),
    box.middle(`     or ${chalk.cyan.bold(yarnUpdate)}  `),
    box.middle(`     to update                               `),
    box.middle(""),
    box.bottom()
  ];
};

module.exports = (currentVersion, messages) => {
  request(options, (error, response, body) => {
    if (error || response.statusCode != 302) return;

    const match = response.headers.location.match(/@([\d\.]+)$/);
    const newestVersion = match && match[1];
    if (!newestVersion || currentVersion === newestVersion) return;

    messages.push(...messageGenerator(currentVersion, newestVersion));
  });
};
