import _ from 'lodash';
import React, { Component } from 'react';
import StyledRow from './StyledRow';

const typeStyle = { fg: 'magenta', bold: true, align: 'right' };
const durationStyle = { fg: 'yellow' };
const sqlStyle = {};
const durationHeaderStyle = { fg: 'yellow' };
const sqlHeaderStyle = { fg: 'magenta' };

const format = num => {
  const str = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  return `${str.padStart(7)} ms`;
};

const containerStyle = {
  padding: { top: 1, left: 2, right: 2 }
};

class RequestActiveRecord extends Component {
  render() {
    const { sqlTime, activeRecords } = this.props.data;
    const maxTypeLength = _.max(activeRecords.map(({ type }) => type.length));

    return (
      <box top={0} height="100%-2" left={0} width="100%-6" {...containerStyle}>
        <StyledRow
          top={0}
          columns={['Total', format(sqlTime), `${activeRecords.length} SQL`]}
          styles={[{ width: maxTypeLength, align: 'right' }, durationHeaderStyle, sqlHeaderStyle]}
        />

        <StyledRow top={1} columns={['================']} styles={[{ fg: 'white' }]} />

        {activeRecords.map(({ type, duration, sql }, i) =>
          <StyledRow
            key={`styledrow-${i}`}
            top={i + 2}
            columns={[type, format(duration), sql]}
            styles={[{ width: maxTypeLength, ...typeStyle }, durationStyle, sqlStyle]}
          />
        )}
      </box>
    );
  }
}

export default RequestActiveRecord;
