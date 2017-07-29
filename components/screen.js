import blessed from "blessed";

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "react-blessed hello world"
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

export default screen;
