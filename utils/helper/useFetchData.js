import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apikey = process.env.API_KEY2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apikey}`
        );
        console.log(response);
        if (response && response.status === 200) {
          setData(response.data);
          setLoading(false);
        } else {
          setError("Failed to retrieve data.");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
