import _ from "lodash";
import React, { Component } from "react";

class StyledRow extends Component {
  render() {
    const { top, styles, columns, spacer = 1 } = this.props;
    styles.reduce((left, style, i) => {
      style.left = left;
      if (!style.width) {
        style.width = i === columns.length - 1 ? `100%-${left}` : columns[i].length;
      }

      return left + style.width + spacer;
    }, 0);

    return (
      <box top={top} height={1} left={0} width="100%">
        {columns.map((column, i) =>
          <box
            key={`row-${top}-${i}`}
            {..._.pick(styles[i], "left", "width", "align")}
            content={column}
            style={styles[i]}
          />
        )}
      </box>
    );
  }
}

export default StyledRow;
