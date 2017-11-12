const _ = require("lodash");
const chalk = require("chalk");

const wrapKey = key => chalk.cyan(`<${key}>`);

const caption = keys => {
  if (_.isString(keys)) return wrapKey(keys);
  return keys[0].map(wrapKey).join(` ${keys[1]} `);
};

const ANSIRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const pad = str => {
  const ansiLength = str.length - str.replace(ANSIRegex, "").length;
  return _.padStart(str, 23 + ansiLength);
};

const foo = ([keys, desc]) => {
  return `${pad(caption(keys))} : ${desc}`;
};

const cursorNavKeys = [
  [[["j", "Down"], "or"], "move down main-view by 1 row"],
  [[["k", "Up"], "or"], "move up main-view by 1 row"],
  ["Space", "move down main-view by 1 page"],
  [[["Shift", "Space"], "+"], "move up main-view by 1 page"],
  ["g", "move to top"],
  [[["Shift", "g"], "+"], "move to bottom"],
  [[["Shift", "j"], "+"], "move down sub-view by 1 row"],
  [[["Shift", "k"], "+"], "move up sub-view by 1 row"]
];

const viewManipulationKeys = [
  ["Enter", "show detail about selected row"],
  ["Escape", "hide the detail"],
  ["b", "show detail with Breakdown tab"],
  ["p", "show detail with Params tab"],
  ["a", "show detail with ActiveRecord tab"],
  ["r", "show detail with Rendering tab"],
  ["l", "show detail with Log tab"]
];

module.exports = () => {
  [
    "",
    "  Examples:",
    "",
    `    $ ${chalk.cyan("rails-dashboard bin/rails s")}`,
    "",
    "  Key Map:",
    "",
    `    ${chalk.yellow("# Cursor navigation")}`,
    ...cursorNavKeys.map(foo),
    "",
    `    ${chalk.yellow("# View manipulation")}`,
    ...viewManipulationKeys.map(foo),
    ""
  ].forEach(line => console.log(line));
};
