import { BsArrowRight } from "react-icons/bs";
import Card from "../Card/Card";
import Empty from "../Empty/Empty";
import { useState, useEffect } from "react";

const CardStack = ({ data, color, loading, menu }) => {
  const [object, setObject] = useState();
  const [displayedItemsCount, setDisplayedItemsCount] = useState(10);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    setObject(data?.slice(0, 12));
    //Setting the isDisbale to false when ever the menu changes
    setIsDisable(false);
  }, [data, menu]);

  const handleLoadMoreClick = () => {
    const newCount = displayedItemsCount + 10;
    setObject(data?.slice(0, newCount));
    setDisplayedItemsCount(newCount);
    newCount >= data?.length ? setIsDisable(true) : null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {data?.length || loading ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5 md:px-5 mt-10 justify-items-center items-center">
          {/* <div className="w-full flex justify-center items-center"> */}
          {object?.map((item, index) => {
            return <Card data={item} key={index} color={color} />;
          })}
          {/* </div> */}
        </div>
      ) : (
        // Empty component in case of non availability of data
        <Empty size={"large"} />
      )}

      {/* Different button if it is disabled */}
      {!isDisable ? (
        <button
          onClick={handleLoadMoreClick}
          disabled={isDisable}
          className="cursor-pointer mt-5 relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium bg-white text-blue-950 border-2 rounded-lg hover:text-white group hover:bg-gray-50 hover:border-white"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-blue-800 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <BsArrowRight />
          </span>
          <span className="relative">Load More</span>
        </button>
      ) : (
        <button
          onClick={handleLoadMoreClick}
          disabled={isDisable}
          className="mt-5 relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-gray-500 border-gray-500 cursor-not-allowed border-2 rounded-lg"
        >
          <span className="relative flex items-center">
            No More Data <BsArrowRight className="ml-2" />
          </span>
        </button>
      )}
    </div>
  );
};

export default CardStack;
