// import _ from "lodash";
// import parse from "./parser";

// for test ////////////////////
const dmyServerInfo = {
  webServer: "Puma",
  railsVersion: "5.1.2",
  url: "http://localhost:3000",
  webServerVersion: "3.9.2",
  rubyVersion: "2.2.1p100"
};

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
const dmyLogs = [
  'Started GET "/users" for 127.0.0.1 at 2017-07-27 20:50:05 +0900',
  '  [1m[35m (0.2ms)[0m  [1m[34mSELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC[0m 123456789012345678901234567890',
  "",
  "ActiveRecord::PendingMigrationError (",
  "",
  "Migrations are pending. To resolve this issue, run:",
  "",
  "        bin/rails db:migrate RAILS_ENV=development",
  "",
  "):",
  "",
  "activerecord (5.1.2) lib/active_record/migration.rb:576:in `check_pending!",
  "activerecord (5.1.2) lib/active_record/migration.rb:553:in `call",
  "actionpack (5.1.2) lib/action_dispatch/middleware/callbacks.rb:26:in `block in call",
  "activesupport (5.1.2) lib/active_support/callbacks.rb:97:in `run_callbacks",
  "actionpack (5.1.2) lib/action_dispatch/middleware/callbacks.rb:24:in `call",
  "actionpack (5.1.2) lib/action_dispatch/middleware/executor.rb:12:in `call",
  "actionpack (5.1.2) lib/action_dispatch/middleware/debug_exceptions.rb:59:in `call",
  "web-console (3.5.1) lib/web_console/middleware.rb:135:in `call_app",
  "web-console (3.5.1) lib/web_console/middleware.rb:28:in `block in call",
  "web-console (3.5.1) lib/web_console/middleware.rb:18:in `catch",
  "web-console (3.5.1) lib/web_console/middleware.rb:18:in `call",
  "actionpack (5.1.2) lib/action_dispatch/middleware/show_exceptions.rb:31:in `call"
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
  renderings: dmyRenderings,
  logs: dmyLogs
};

// generate 1request per 3sec.
const SPEED = 1000;

export default eventEmitter => {
  // if (ret && !this.interval) {
  //   this.interval = true;
  setInterval(() => {
    const sec = new Date().getSeconds();
    const status = sec % 3 === 0 ? "422" : sec % 5 === 0 ? "500" : "200";
    const dmy = Object.assign({}, dmyData, {
      date: `08-01 00:12:${sec.toString().padStart(2, "0")}`,
      status: status
    });
    eventEmitter.emit("requested", dmy);
  }, SPEED);
  // }
};
