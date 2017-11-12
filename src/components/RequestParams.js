import _ from "lodash";
import React, { Component } from "react";

const labelStyle = { fg: "magenta", bold: true };

class RequestParams extends Component {
  scroll(amount) {
    // nope
  }

  render() {
    const params = this.props.data.params;

    const maxNameLength = _.max(params.map(param => param.name.length)) + 1;
    return (
      <text top={0} height="100%-2" left={0} width="100%-2">
        {params.map(({ name, value }, i) => {
          return [
            <box
              top={i + 1}
              height={1}
              left={0}
              width={maxNameLength + 3}
              content={`${_.padStart(name, maxNameLength)} : `}
              style={labelStyle}
            />,
            <box top={i + 1} height={1} left={maxNameLength + 3} width={`100%-${maxNameLength + 3}`} content={value} />
          ];
        })}
      </text>
    );
  }
}

export default RequestParams;
