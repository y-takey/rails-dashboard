import blessed from "blessed";

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Rails Dashboard"
});

screen.key(["C-c"], function(ch, key) {
  return process.exit(0);
});

export default screen;
