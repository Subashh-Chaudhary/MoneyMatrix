
import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [currencyInfo, setCurrencyInfo] = useState({
    date: "",
    rate: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const currentDate = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate() - 1}`;
        
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${currentDate}/v1/currencies/${currency}.json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const rate = data[currency];
        const conversionDate = data.date;
        setCurrencyInfo({ date: conversionDate, rate: rate });
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [currency]);

  return currencyInfo;
}

export default useCurrencyInfo;

