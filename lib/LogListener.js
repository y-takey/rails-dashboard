import parse from './parser';

// for test ////////////////////
const dmyParams = [{ name: 'foo', value: 'hoge' }, { name: 'bar', value: 'fuga' }];
const dmyActiveRecords = [
  {
    type: 'User Load',
    sql:
      'SELECT * FROM users <dmy>123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
    duration: 1
  },
  { type: 'SQL', sql: "UPDATE users SET name = 'hoge'", duration: 10 }
];
const dmyRenderings = [
  { view: 'views/shared/_page_title.html.haml', duration: 2 },
  { view: 'views/shared/_page_body.html.haml', duration: 13 }
];
const dmyData = {
  date: '',
  status: '200',
  method: 'GET',
  url: '/fooo/bar',
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
    if (ret && !this.interval) {
      this.interval = true;
      setInterval(() => {
        dmyData.date = `2017-08-01 00:12:${new Date().getSeconds()}`;
        this.eventEmitter.emit('requested', dmyData);
      }, 1000);
    }
    //
  }

  stderr(data) {
    this.eventEmitter.emit('logged', data.toString().trim());
  }
}

export default LogListener;
