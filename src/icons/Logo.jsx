import React from "react";

const Logo = (props) => {
  const { className } = props;

  return (
    <svg
      className={className}
      viewBox="0 0 52 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="62.1009"
        height="69.8636"
        transform="matrix(0.833067 -0.0465515 -0.000532567 1.14185 0.0377197 2.88985)"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(-0.00625009) scale(0.01125 0.01)"
          />
        </pattern>
        <image
          id="image0"
          width="90"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Logo;
