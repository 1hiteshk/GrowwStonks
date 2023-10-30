import { useState, useEffect } from "react";
import axios from "axios";

const usePriceTrack = (params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apikey = process.env.API_KEY3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${params}&apikey=${apikey}`
        );
        if (response && response.status === 200) {
          setData(response.data);
          setLoading(false);
        } else {
          throw new Error("Failed to retrieve data.");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);
  return { data, loading, error };
};

export default usePriceTrack;
