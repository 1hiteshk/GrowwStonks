import Link from "next/link";
import { BsArrowBarRight } from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

const card = (props) => {
  const { data, color } = props;
  return (
    <div className="w-4/5 sm:w-3/4 lg:w-2/3 p-2 md:p-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {data?.ticker}
      </h5>
      <div className="flex items-center my-2.5">
        <span
          className={`${color === "green" ? "text-green-500" : "text-red-500"}`}
        >
          {color === "green" ? "+" : null}
          {parseFloat(data?.change_percentage).toFixed(2)}
        </span>
        {color === "green" ? (
          <VscTriangleUp className="text-green-500 ml-2" />
        ) : (
          <VscTriangleDown className="text-red-500 ml-2" />
        )}
      </div>
      <div>
        <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
          ${data?.price}
        </span>
      </div>
      <Link
        href={`/${data?.ticker}`}
        className="relative inline-flex items-center justify-start px-3 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group mt-2"
      >
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-yellow-300 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative flex items-center w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-black">
          More <BsArrowBarRight className="ml-2" />
        </span>
      </Link>
    </div>
  );
};

export default card;
