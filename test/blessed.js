// This file is sandbox for blessed purely.
// to run, exec like this `$ node ./test/blessed.js`
const blessed = require("blessed");
const _ = require("lodash");

const screen = blessed.screen({
  smartCSR: false,
  title: "blessed sandbox"
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

// for display log
const logBox = blessed.box({
  label: " console ",
  top: "100%-5",
  width: "100%",
  height: 5,
  scrollable: true,
  keys: true,
  tags: true,
  border: {
    type: "line"
  }
});

screen.append(logBox);

const log = text => {
  logBox.setContent(text);
  screen.render();
};

// -----------------------------------------------

const content = `01: Hello
02: World
03: one
04: two
05: three
06: four
07: five
08: six
09: seven
10: eight
11: nine
12: {red-fg}ten{/red-fg}
13: eleven
14: twelve
15: tirteen
16: fourteen
17: fifteen!`;

const box = blessed.scrollablebox({
  label: " EX ",
  padding: 1,
  top: "0",
  left: "center",
  width: "50%",
  height: "25%",
  content,
  border: {
    type: "line"
  },
  tags: true,
  scrollable: true,
  keys: true
});

screen.append(box);
let state = null;

const scroll = amount => {
  if (state === amount) {
    box.scroll(amount);
  } else {
    state = amount;
    box.scroll(3 * amount);
  }
};

screen.key(["j"], function(ch, key) {
  log("shift");
  scroll(1);
});

screen.key(["k"], function(ch, key) {
  log("unshift");
  scroll(-1);
});

box.focus();

// -----------------------------------------------

screen.render();
log("initialized!\nfoo\nbar\nbaz\nhoge\nfuga");
