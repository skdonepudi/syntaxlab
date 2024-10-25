export const CompressIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className + "dark:stroke-white"}
  >
    <path
      d="M14 10L21 3M14 10H18.5M14 10V5.5M10 14L3 21M10 14H5.5M10 14L10 18.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CompressIcon;
