"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Empty from "../Empty/Empty";
import Spinner from "../Spinner/Spinner";
import { BsSearch } from "react-icons/bs";
const Search = () => {
  const searchCache = useSelector((store) => store.search);

  const [visiblity, setVisiblity] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearchSuggestion] = useState([]);
  const [filterButton, setFilterButton] = useState(1);
  const [noDataVisiblity, setNoDataVisiblity] = useState(false);
  const[loading, setLoading]= useState(false)
  const router = useRouter();

  async function getSearchSuggestion(keyWord) {
      setLoading(true)
    const res = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=CMHOK9CXEB7TYF96`
    );
   setLoading(false);
   console.log(res?.data?.hasOwnProperty("Information"));
    if(res?.data?.hasOwnProperty("Information")){
      console.log("infor");
      setNoDataVisiblity(true);
    }
    if(res?.data?.bestMatches?.length===0){
      setNoDataVisiblity(true);
    }
    setSearchSuggestion(res?.data?.bestMatches?.slice(0, 6));
  }

  useEffect(() => {
    // api call

    //make an api call after every key press
    //but if the diff. b/w two press/2 api call is <200ms decline api call
    const timer = setTimeout(() => {
      // if (searchCache[searchQuery]) {
      //   // cache is stored in redux store so when wback <- less api calls made
      // } else {
      getSearchSuggestion(searchQuery);
      // }
      // setSuggestions(searchCache[searchQuery]);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  function handelChange(e) {
    setFilterButton(1);
    setSearchQuery(e.target.value);
    setNoDataVisiblity(false)
    console.log("working");
    if (e.target.value.length > 0) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }

  function handelAll() {
    setFilterButton(1);
    getSearchSuggestion(searchQuery);
  }
  function handelEtf() {
    setFilterButton(2);

    const etf = search?.filter((obj) => obj["3. type"] === "Equity");
    if (etf?.length === 0) {
      // setVisiblityNoData(true);
      setNoDataVisiblity(true)
    } else {
      setSearchSuggestion(etf);
    }
  }

  function handelStocks() {
    setFilterButton(3);
    console.log("stocks");

    const stocks = search?.filter((obj) => obj["3. type"] === "Stock");
    if (stocks?.length === 0) {
      setNoDataVisiblity(true)
    } else {
      setSearchSuggestion(stocks);
    }
  }

  const handleRouter = (item) => {
    setSearchQuery("");
    setVisiblity(false);
    router.push(`/${item}`);
  };

  return (
    <>
      <div className="flex flex-col align-middle justify-center relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        </div>
        <div className="flex items-center px-4 py-2 rounded-full bg-gray-600 gap-x-3">
            <BsSearch/>
            <input
            type="text"
            onChange={(e) => handelChange(e)}
            value={searchQuery}
            className="bg-gray-600 focus:outline-none"
            />
        </div>

        {visiblity && (
          <div className="flex flex-col items-start mt-6 z-30 absolute top-6 left-5 bg-gray-700 p-8 rounded-lg">
            {noDataVisiblity && (
              <div>
                <Empty size={"small"} />
              </div>
            )}
            {!noDataVisiblity && (
              <div>
                {loading && <Spinner size={"small"}/>}
              {  !loading && <div className="w-52 flex justify-between">
                  <button
                    onClick={handelAll}
                    className={`border-lg border-2 p-2 rounded-lg ${
                      filterButton === 1 ? "bg-[#fde047]" : " "
                    } ${
                      filterButton === 1
                        ? "border-black text-black"
                        : "border-white text-white "
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={handelEtf}
                    className={`border-lg border-2 p-2 rounded-lg ${
                      filterButton === 2 ? "bg-[#fde047]" : " "
                    } ${
                      filterButton === 2
                        ? "border-black text-black"
                        : "border-white text-white "
                    }`}
                  >
                    ETF
                  </button>
                  <button
                    onClick={handelStocks}
                    className={`border-lg border-2 p-2 rounded-lg ${
                      filterButton === 3 ? "bg-[#fde047] " : " "
                    }${
                      filterButton === 3
                        ? "border-black text-black"
                        : "border-white text-white"
                    }`}
                  >
                    Stocks
                  </button>
                </div>}
                <div>
                  {(search && !loading) &&
                    search.map((item) => {
                      return (
                        <ul className="flex mt-3">
                          <li
                            className="hover:bg-slate-400 p-2 rounded-lg transition-all ease-in-out"
                            onClick={() => handleRouter(item["1. symbol"])}
                          >
                            {item["2. name"]}
                          </li>
                        </ul>
                      );
                    })}
                </div>
                
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
