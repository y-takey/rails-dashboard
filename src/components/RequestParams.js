import _ from "lodash";
import React, { Component } from "react";

const labelStyle = { fg: "magenta", bold: true };

class RequestParams extends Component {
  render() {
    const params = this.props.data.params;

    const maxNameLength = _.max(params.map(param => param.name.length)) + 1;
    return (
      <box top={0} height="100%-2" left={0} width="100%-2">
        {params.map(({ name, value }, i) => {
          return [
            <box
              top={i + 1}
              height={1}
              left={0}
              width={maxNameLength + 3}
              content={`${name.padStart(maxNameLength)} : `}
              style={labelStyle}
            />,
            <box top={i + 1} height={1} left={maxNameLength + 3} width={`100%-${maxNameLength + 3}`} content={value} />
          ];
        })}
      </box>
    );
  }
}

export default RequestParams;
