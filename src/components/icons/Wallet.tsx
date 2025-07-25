const Wallet = ({ className }: { className: string }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fal"
      data-icon="wallet"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="currentColor"
        d="M80 32C35.8 32 0 67.8 0 112V400c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V176c0-44.2-35.8-80-80-80H112c-8.8 0-16 7.2-16 16s7.2 16 16 16H432c26.5 0 48 21.5 48 48V400c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48H464c8.8 0 16-7.2 16-16s-7.2-16-16-16H80zM384 312a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
      ></path>
    </svg>
  );
};

export default Wallet;
