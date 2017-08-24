export default {
  ms(num) {
    const roundedNum = Math.round(num * 10) / 10;
    const str = String(roundedNum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return `${str.padStart(7)} ms`;
  }
};
