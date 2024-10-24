const ExpandBottom = ({
  className,
  color = "#000000",
}: {
  className: string;
  color?: string;
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title />

      <g id="Complete">
        <g id="sidebar-top">
          <g>
            <rect
              data-name="Square"
              fill="none"
              height="18"
              id="Square-2"
              rx="2"
              ry="2"
              stroke={color}
              strokeMiterlimit="10"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            />

            <line
              fill="none"
              stroke={color}
              strokeMiterlimit="10"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="9"
              y2="9"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ExpandBottom;
