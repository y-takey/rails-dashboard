import _ from "lodash";

export default {
  ms(num) {
    const roundedNum = Math.round(num * 10) / 10;
    const str = String(roundedNum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return `${_.padStart(str, 7)} ms`;
  }
};
