import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MonthlyChart = ({symbol}) => {
  const apikey = process.env.API_KEY2;

  const fetchStockData = async () => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apikey}`
    );

    return response.data;
  };
  //   const { data, loading, error } = usePriceTrack("IBM");
  // const [chartData, setChartData] = useState({});

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchStockData();
        // console.log(result["Time Series (Daily)"]);

        setData(result);
        setLabels(Object.keys(result["Monthly Time Series"]));
        setValues(
          Object.values(result["Monthly Time Series"]).map(
            (obj) => obj["4. close"]
          )
        );
        console.log(labels);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  console.log(data, labels, values)

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stocks Monthly Price",
      },
    },
  };

  const data1 = {
    labels: labels.slice(0,30).reverse(),
    datasets: [
      {
        label: "Monthly Price",
        data: values,
        borderColor: "#F6921E",
        fill: true,
      },
    ],
  };
  return (
    <div>
      <Line data={data1} options={options} />
    </div>
  );
};

export default MonthlyChart;
