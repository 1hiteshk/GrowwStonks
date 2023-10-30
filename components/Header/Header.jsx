"use client";
import { useState } from "react";
import searchSlice from "@/redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "@/redux/searchSlice";
import { useEffect } from "react";
import axios from "axios";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ThemeSwitcher } from "@/app/ThemeSwitcher";

const Header = () => {
  // const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const searchCache = useSelector((store) => store.search);

  const [theme, setTheme] = useState("dark");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // api call

    //make an api call after every key press
    //but if the diff. b/w two press/2 api call is <200ms decline api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        // cache is stored in redux store so when we back <- less api calls made
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    console.log("API call - " + searchQuery);
    const responseData = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=5ZJT096PZ7CB35FW`
    );

    console.log(responseData, "hh");
    setSuggestions(responseData?.data?.bestMatches);
    // if(suggestions){
    //   console.log(suggestions)}
    //       console.log(responseData?.data?.bestMatches[0]["2. name"]);
    // await dispatch(cacheResults({ query: searchQuery, results: responseData?.data?.bestMatches }));

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: responseData?.data?.bestMatches[0]["2. name"],
      })
    );
  };

  function handelFocus() {
    console.log("working");
    setShowSuggestions(true);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center sm:justify-between mx-auto p-4 gap-y-4">
        <a href="/" className="flex items-center">
          <img
            src="/assets/icon.webp"
            className="h-10 mr-3"
            alt="GrowwStonks Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            GrowwStonks
          </span>
        </a>
        <div className="relative block w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            {/* <span className="sr-only">Search icon</span> */}
          </div>

          {/* <button  className='dark:text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]'
      onClick={handleThemeSwitch}> { darkMode ? <MdDarkMode className='mr-6'/> : <MdLightMode className='mr-6' />} {theme} </button>
          <p className="text-purple-300 dark:text-white">hey</p> */}
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handelFocus}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 400)}
          />
          {/* <ThemeSwitcher /> */}

          {/* <div>

{ showSuggestions && <div>


 <div>
   <button>ALL</button>
   <button>ETF</button>
   <button>Stocks</button>
 </div>

<div className="fixed top-12 z-10 md:pl-0 md:ml-5 bg-slate-700 w-44 md:w-64 lg:w-[541px] rounded-lg mt-1">
 <ul>

   {suggestions?.length !==0 ?
   suggestions?.map((suggestion,index) => {
     return (
       <li
         key={suggestion}
         className="shadow-sm py-2 px-3 flex items-center hover:bg-gray-900 w-full cursor-pointer"
       >
           {suggestion['2. name']}
       </li>
     );
   }): " "}
 </ul>
</div>

 </div>}
</div> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
