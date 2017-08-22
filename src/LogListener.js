import _ from "lodash";
import parse from "./parser";

// for test ////////////////////
const dmyParams = [{ name: "foo", value: "hoge" }, { name: "bar", value: "fuga" }];
const dmyActiveRecords = [
  {
    type: "User Load",
    sql:
      "SELECT * FROM users <dmy>123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    duration: 1
  },
  { type: "SQL", sql: "UPDATE users SET name = 'hoge'", duration: 10 }
];
const dmyRenderings = [
  { view: "views/shared/_page_title.html.haml", duration: 2 },
  { view: "views/shared/_page_body.html.haml", duration: 13 }
];
const dmyData = {
  date: "",
  status: "200",
  method: "GET",
  format: "JSON",
  processor: "HogesController#index",
  url: "/fooo/bar",
  respTime: 40,
  sqlTime: 18,
  renderingTime: 16,
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
    // if (ret && !this.interval) {
    //   this.interval = true;
    //   setInterval(() => {
    //     const sec = new Date().getSeconds();
    //     const status = sec % 3 === 0 ? "422" : sec % 5 === 0 ? "500" : "200";
    //     const dmy = Object.assign({}, dmyData, {
    //       date: `08-01 00:12:${sec.toString().padStart(2, "0")}`,
    //       status: status
    //     });
    //     this.eventEmitter.emit("requested", dmy);
    //   }, 3000);
    // }
    //
  }

  stderr(data) {
    this.eventEmitter.emit("logged", data.toString().trim());
  }
}

export default LogListener;
