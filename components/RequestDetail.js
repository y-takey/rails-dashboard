import _ from 'lodash';
import React, { Component } from 'react';

const style = { fg: 'white', border: { fg: 'white' } };

const items = [
  { key: 'breakdown', label: 'Breakdown [b]' },
  { key: 'params', label: 'Params [p]' },
  { key: 'activerecord', label: 'ActiveRecord [a]' },
  { key: 'rendering', label: 'Rendering [r]' }
];

const itemSize = _.max(_.map(items, item => item.label.length));

class RequestDetail extends Component {
  renderItems(mode) {
    console.log(('length': itemSize));
    return items.map((item, i) => {
      const style = item.key === mode ? { bg: 'cyan' } : { bg: '' };
      return <text top={i} key={`item-${i}`} left={0} width={itemSize} content={item.label} style={style} />;
    });
  }

  render() {
    const { top, height, mode, data } = this.props;
    const { params, activeRecords, renderings } = data;

    return (
      <box top={top} height={height} left="0" width="100%">
        <box left={0} width={itemSize}>
          {this.renderItems(mode)}
        </box>
        <box top={0} left={itemSize} width={`100%-${itemSize}`} label="Detail" border={{ type: 'line' }} style={style}>
          <box left={0} width="20%">
            {params[0].value}
          </box>
          <box left="20%" width="80%-2">
            {activeRecords[0].sql}
          </box>
        </box>
      </box>
    );
  }
}

export default RequestDetail;
