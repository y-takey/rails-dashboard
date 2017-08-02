import parse from "./parser";

// for test ////////////////////
const dmyParams = [{ name: "foo", value: "hoge" }];
const dmyActiveRecords = [{ type: "User Load", sql: "SELECT * FROM users", duration: "1ms" }];
const dmyRenderings = [{ view: "views/shared/_page_title.html.haml", duration: "2ms" }];
const dmyData = {
  date: "",
  status: "200",
  method: "GET",
  url: "/fooo/bar",
  params: dmyParams,
  activeRecords: dmyActiveRecords,
  renderings: dmyRenderings
};
//////////////////////

class LogListener {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.stdout = this.stdout.bind(this);
  }

  stdout(data) {
    const ret = parse(data);
    if (ret) this.eventEmitter.emit(ret.type, ret.data);
    // for test
    if (ret && !this.interval) {
      this.interval = true;
      setInterval(() => {
        dmyData.date = `2017-08-01 00:12:${new Date().getSeconds()}`;
        this.eventEmitter.emit("requested", dmyData);
      }, 3000);
    }
    //
  }

  stderr(data) {
    this.eventEmitter.emit("logged", data.toString().trim());
  }
}

export default LogListener;
