"use client";
import { useEffect, useState } from "react";
import useFetchData from "@/utils/helper/useFetchData";
import CardStack from "@/components/CardStack/CardStack";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import Spinner from "@/components/Spinner/Spinner";
// import Image from "next/image";
// import { useTheme } from "next-themes";

export default function Home() {
  const { data, loading, error } = useFetchData();
  const [menu, setMenu] = useState(1);
  // const [theme, setTheme] = useTheme();

  // const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="px-5 lg:px-20">
      {/* Menu Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 pt-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2" onClick={() => setMenu(1)}>
            <div
              className={`inline-flex items-center justify-center p-4 cursor-pointer ${
                menu === 1
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:border-gray-300 dark:hover:text-gray-300"
              } rounded-t-lg active  group`}
            >
              <VscTriangleUp />
              Top Gainers
            </div>
          </li>
          <li className="mr-2" onClick={() => setMenu(2)}>
            <div
              className={`inline-flex items-center justify-center p-4 cursor-pointer ${
                menu === 2
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:border-gray-300 dark:hover:text-gray-300"
              } rounded-t-lg active  group`}
              aria-current="page"
            >
              <VscTriangleDown />
              Top Losers
            </div>
          </li>
        </ul>
      </div>
      {/* Spinner loading while the data is fetching */}
      {loading && <Spinner />}

      {/* Stock details based on the menu */}
      {!loading && menu === 1 ? (
        <CardStack
          data={data?.top_gainers}
          color={"green"}
          loading={loading}
          menu={menu}
        />
      ) : (
        <CardStack
          data={data?.top_losers}
          color={"red"}
          loading={loading}
          menu={menu}
        />
      )}
    </div>
  );
}
