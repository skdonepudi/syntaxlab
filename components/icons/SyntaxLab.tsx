const SyntaxLabIcon = ({
  className,
  width = 24,
  height = 24,
}: {
  className: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      fill="currentColor"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="bracket-square-2"
      data-name="Line Color"
      xmlns="http://www.w3.org/2000/svg"
      className={className + "dark:fill-white"}
    >
      <path
        id="secondary"
        d="M14,17h1a1,1,0,0,0,1-1V13a1,1,0,0,1,1-1,1,1,0,0,1-1-1V8a1,1,0,0,0-1-1H14"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></path>
      <path
        id="secondary-2"
        data-name="secondary"
        d="M10,7H9A1,1,0,0,0,8,8v3a1,1,0,0,1-1,1,1,1,0,0,1,1,1v3a1,1,0,0,0,1,1h1"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></path>
      <rect
        id="primary"
        x="3"
        y="3"
        width="18"
        height="18"
        rx="1"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></rect>
    </svg>
  );
};

export default SyntaxLabIcon;
