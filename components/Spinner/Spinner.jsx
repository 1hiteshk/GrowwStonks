const Spinner = ({ size }) => {
  return (
    <div
      className={`text-center flex justify-center items-center ${
        size === "small" ? null : "h-screen"
      }`}
    >
      <img
        src="/assets/spinner.gif"
        alt="loading..."
        className={`${size === "small" ? "w-24" : null}`}
      />
    </div>
  );
};

export default Spinner;
