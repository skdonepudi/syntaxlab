const ExpandEditor = ({ className }: { className: string }) => {
  return (
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className + "dark:stroke-white"}
    >
      <title />

      <g id="Complete">
        <g id="sidebar-right">
          <g>
            <rect
              data-name="Square"
              fill="none"
              height="18"
              id="Square-2"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            />

            <line
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
              x1="15"
              x2="15"
              y1="21"
              y2="3"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ExpandEditor;
