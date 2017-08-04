import React, { Component } from 'react';

const header = ['date', 'status', 'method', 'url'];
const style = {
  border: { fg: 'white' },
  header: { bg: 'cyan' },
  cell: { fg: 'white', selected: { bg: 'green', fg: 'white' } }
};

const containerOptions = {
  ref: 'table',
  border: { type: 'line' },
  style: style
};

const rows = data => {
  return data.map(({ date, status, method, url }, index) => {
    return (
      <box top={index} key={`row-${index}`}>
        <box left={0} width={11}>
          {date}
        </box>
        <box left={11} width={4}>
          {status}
        </box>
        <box left={15} width={4}>
          {method}
        </box>
        <box left={19}>
          {url}
        </box>
      </box>
    );
  });
};

class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selectedIndex === 0) return;

    const diff = nextProps.data.length - this.props.data.length;
    this.setState({ selectedIndex: this.state.selectedIndex + diff });
  }

  componentDidMount() {
    this.setState({ rows: this.refs.table.height });
  }

  render() {
    const { top, height, data } = this.props;

    return (
      <box top={top} height={height} {...containerOptions}>
        {rows(data)}
        <box top={4}>
          rows:{this.state.rows}
        </box>
      </box>
    );
  }
}

export default RequestList;
