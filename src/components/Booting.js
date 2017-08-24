import _ from "lodash";
import React, { Component } from "react";

const Spinner = ".";
const MaxSpinner = 10;

const containerProps = {
  height: "100%",
  width: "100%",
  align: "center",
  valign: "middle",
  style: { fg: "green" }
};

class Booting extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
  }

  componentDidMount() {
    const intervalId = setInterval(() => this.setState({ counter: this.state.counter + 1 }), 500);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const counter = this.state.counter;
    const spinner = _.padEnd(Spinner.repeat(counter % MaxSpinner), MaxSpinner);

    return <box {...containerProps} content={`Booting${spinner}`} />;
  }
}

export default Booting;
