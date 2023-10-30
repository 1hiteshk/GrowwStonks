"use client";
import { useState } from "react";
import searchSlice from "@/redux/searchSlice";
import { cacheResults } from "@/redux/searchSlice";
import { useEffect } from "react";
import axios from "axios";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ThemeSwitcher } from "@/app/ThemeSwitcher";
import Search from "../SearchComp/Search";

const Header = () => {
  // const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // const dispatch = useDispatch();


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
        <Search/>

          {/* <button  className='dark:text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]'
      onClick={handleThemeSwitch}> { darkMode ? <MdDarkMode className='mr-6'/> : <MdLightMode className='mr-6' />} {theme} </button>
          <p className="text-purple-300 dark:text-white">hey</p> */}
         
          {/* <ThemeSwitcher /> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
