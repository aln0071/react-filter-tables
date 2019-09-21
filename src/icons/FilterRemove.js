import React from 'react';

class FilterRemove extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {width, fill, style, viewBox, onClick, className} = this.props;
    return(
      <svg
        width={width}
        fill={fill}
        style={style}
        height={width}
        viewBox={viewBox}
        onClick={()=>{onClick()}}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
            <g>
                <g>
                    <path d="M480 183.91L640 0L319.99 0L0 0L159.98 183.91L319.99 367.82L480 183.91Z"></path>
                </g>
                <g>
                    <path d="M248.74 561.46L319.12 640L391.26 640L391.26 196.55L248.74 196.55L248.74 561.46Z"></path>
                    <g>
                        <path d="M248.74 561.46L319.12 640L391.26 640L391.26 196.55L248.74 196.55L248.74 561.46Z"></path>
                    </g>
                </g>
                <g>
                    <path d="M705.71 438.22L825.61 560.92L758.47 629.64L638.58 506.93L518.68 629.64L451.55 560.92L571.44 438.22L451.55 315.51L518.68 246.79L638.58 369.5L758.47 246.79L825.61 315.51L705.71 438.22Z"></path>
                </g>
            </g>
        </g>
      </svg>
    )
  }
}

FilterRemove.defaultProps = {
  style: {},
  fill: "#000",
  width: "100%",
  className: "",
  viewBox: "0 0 832 640",
  onClick: () => {}
}

export default FilterRemove;
