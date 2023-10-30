"use client";
import Spinner from "@/components/Spinner/Spinner";
import useCustomData from "@/utils/helper/useCustomData";
import React, { useState } from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsCalendarDateFill,
  BsFlagFill,
  BsFillCalculatorFill,
} from "react-icons/bs";
import { RiStockFill } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";
import { FaExchangeAlt } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import DailyChart from "@/components/Charts/DailyChart";
import WeeklyChart from "@/components/Charts/WeeklyChart";
import MonthlyChart from "@/components/Charts/MonthyChart";
import { MdOutlineDataExploration } from "react-icons/md";

const page = ({ params }) => {
  console.log(params?.stocksymbol)
    const { data, loading, error } = useCustomData(params?.stocksymbol);
    const symbol = params?.stocksymbol
  // const { data, loading, error } = useCustomData("IBM");
  const [menu, setMenu] = useState(1);

  //calculation for current price and percentage growth/loss
  const currPrice = data?.MarketCapitalization && data?.SharesOutstanding ? data?.MarketCapitalization / data?.SharesOutstanding : 0.00 ;
  const percentChange = currPrice === 0.00 ? 0.00 : 
    ((currPrice - data["52WeekLow"]) / data["52WeekLow"]) * 100;

  return (
    <div>
      {loading && <Spinner />}
      {!loading && (
        <div className="flex justify-center items-center my-10">
          <div className="w-11/12 flex flex-col lg:flex-row justify-center gap-x-5">
            <div className="w-full lg:w-2/3 flex-col flex gap-y-5">
              {/* Basic Information */}
              <div className="flex justify-around border border-gray-300 rounded-lg py-5 gap-x-5 px-3 md:px-0">
                <div>
                  <div className="font-bold text-lg md:text-xl">
                    {data?.Name}
                  </div>
                  <div>
                    {data?.Symbol}, {data?.AssetType}
                  </div>
                  <div>{data?.Exchange}</div>
                </div>
                <div>
                  <div>${currPrice.toFixed(2)}</div>
                  <div
                    className={`${
                      percentChange > 0 ? "text-green-500" : "text-red-500"
                    } flex items-center`}
                  >
                    {percentChange > 0 ? "+" : null}
                    {percentChange.toFixed(2)}%
                    {percentChange > 0 ? (
                      <VscTriangleUp className="ml-2" />
                    ) : (
                      <VscTriangleDown className="ml-2" />
                    )}
                  </div>
                </div>
              </div>

              {/* Chart Tracking */}
              <div className="border border-gray-300 rounded-lg p-5">
                <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                  <li className="w-full">
                    <button
                      onClick={() => setMenu(1)}
                      className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                      aria-current="page"
                    >
                      Daily
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      onClick={() => setMenu(2)}
                      className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Weekly
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      onClick={() => setMenu(3)}
                      className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Monthly
                    </button>
                  </li>
                </ul>
                {menu === 1 ? (
                  <DailyChart symbol={symbol}/>
                ) : menu === 2 ? (
                  <WeeklyChart symbol={symbol}/>
                ) : menu === 3 ? (
                  <MonthlyChart symbol={symbol}/>
                ) : null}
              </div>

              {/* Stock Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 border border-gray-300 rounded-lg">
                <div className="bg-blue-50 rounded-lg text-black p-5">
                  <div className="text-2xl md:text-3xl font-extrabold border-b-2 border-black mb-2">
                    STOCK PERFORMANCE
                  </div>
                  <div className="flex items-center">
                    <BsFillArrowUpSquareFill className="mr-2" />
                    52-Week-High:
                    <span className="text-green-500 ml-2">
                      {data["52WeekHigh"] ? `$${data["52WeekHigh"]}` : "Not Displayed" }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BsFillArrowDownSquareFill className="mr-2" />
                    52-Week-Low:
                    <span className="text-red-500 ml-2">
                    {data["52WeekLow"] ? `$${data["52WeekLow"]}` : "Not Displayed" }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiOutlineCurrencyDollar className="mr-2" />
                    50-Day-Moving-Average: {data["50DayMovingAverage"] ? `$${data["50DayMovingAverage"]}` : "Not Displayed" }
                  </div>
                  <div className="flex items-center">
                    <HiOutlineCurrencyDollar className="mr-2" />
                    200-Day-Moving-Average: {data["200DayMovingAverage"] ? `$${data["200DayMovingAverage"]}` : "Not Displayed" }
                  </div>
                </div>

                <div className="bg-blue-500 rounded-lg p-5">
                  <div className="text-2xl md:text-3xl font-extrabold border-b-2 border-white mb-2">
                    DIVIDEND INFO
                  </div>
                  <div className="flex items-center">
                    <RiStockFill className="mr-2" />
                    Shares Outstanding: {data?.SharesOutstanding || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <BsCalendarDateFill className="mr-2" /> Dividend Date:{" "}
                    {data?.DividendDate || "Not Displayed" }
                  </div>
                  <div className="flex items-center">
                    <BsCalendarDateFill className="mr-2" />
                    Ex Dividend Date: {data?.ExDividendDate || "Not Displayed"}
                  </div>
                </div>

                <div className="bg-blue-950 rounded-lg p-5">
                  <div className="text-2xl md:text-3xl font-extrabold border-b-2 border-white mb-2">
                    FINANCIAL DATA
                  </div>
                  <div className="flex items-center">
                    <MdOutlineDataExploration className="mr-2" />
                    P/E Ratio: {data?.PERatio || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <MdOutlineDataExploration className="mr-2" />
                    P/E-G Ratio: {data?.PEGRatio || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <SiCoinmarketcap className="mr-2" />
                    Market Cap: {data?.MarketCapitalization || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <BsFillCalculatorFill className="mr-2" />
                    Dividend Per Share: {data?.DividendPerShare || "Not Displayed"}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 text-blue-950">
                  <div className="text-2xl md:text-3xl font-extrabold border-b-2 border-blue-950 mb-2">
                    CONTACT INFORMATION
                  </div>
                  <div className="flex items-center">
                    <AiFillCreditCard className="mr-2" />
                    CIK: {data?.CIK || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <FaExchangeAlt className="mr-2" />
                    Exchange: {data?.Exchange || "Not Displayed"}
                  </div>
                  <div className="flex items-center">
                    <BsFlagFill className="mr-2" />
                    Country: {data?.Country || "Not Displayed"}
                  </div>
                </div>
              </div>
            </div>

            {/* About Information */}
            <div className="w-full lg:w-1/3 border border-gray-300 rounded-lg p-5">
              <div className="text-4xl text-blue-500 font-bold border-b-2 border-white mb-3">
                About {data?.Symbol}
              </div>
              <p>{data?.Description}</p>
              <div className="bg-blue-950 border border-blue-600 p-3 rounded-full mt-5 inline-block">
                Industry: {data?.Industry}
              </div>
              <div className="bg-blue-950 border border-blue-600 p-3 rounded-full mt-5 inline-block">
                Sector: {data?.Sector}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
