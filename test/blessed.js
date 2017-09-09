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
  mouse: true,
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

const box = blessed.scrollablebox({
  label: " EX ",
  padding: 1,
  top: "0",
  left: "center",
  width: "50%",
  height: "25%",
  content:
    "Hello\nWorld\none\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\n{red-fg}ten{/red-fg}\neleven\ntwelve\ntirteen\nfourteen\nfifteen!",
  border: {
    type: "line"
  },
  tags: true,
  scrollable: true,
  mouse: true
});

screen.append(box);

box.focus();

// -----------------------------------------------

screen.render();
log("initialized!");
