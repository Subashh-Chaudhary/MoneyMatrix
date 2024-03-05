import React, { useEffect, useState } from "react";
import { InputBox, CurrencyDetails } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import CountryData from "./currencyData";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("npr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [country, setCountry] = useState("Nepal");
  const [currencyCode, setCurrencyCode] = useState("NPR");
  const [currency, setCurrency] = useState("Neplese Repee");

  useEffect(() => {
    let result;

    for (const key in CountryData) {
      if (CountryData.hasOwnProperty(key)) {
        const value = CountryData[key];
        if (value.country === country) {
          result = { [key]: value };
          break;
        }
      }
    }
    let code = Object.keys(result);
    let currentCountry = Object.values(result).map(
      (countryInfo) => countryInfo["currencyName"]
    );
    console.log(`Code :${code}`);
    console.log(`Name :${country}`);
    console.log(result);

    setCurrencyCode(code);
    setCurrency(currentCountry)
  }, [currency])
    

  const countries = CountryData;
  const countryOptions = Object.values(countries).map(
    (countryInfo) => countryInfo.country
  );

  const currencyInfo = useCurrencyInfo(from);
  const { date, rate } = currencyInfo;
  const options = Object.keys(rate);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * rate[to]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const countryData = CountryData[country];
    if (countryData) {
      setSelectedCountry(countryData.country);
    } else {
      setSelectedCountry("Country not found");
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/8370426/pexels-photo-8370426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className=" lg:w-1/2 sm:w-96 h-auto mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <div className="mb-3 ">
            <p className="text-xl text-white font-extrabold uppercase">
              Conversion Date : {date}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currecy) => setFrom(currecy)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 lg:px-4 lg:py-1 lg:text-xl"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currecy) => setTo(currecy)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 md:py-4 rounded-lg lg:text-2xl font-bold"
              onClick={convert}
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <div className="w-full">
              <CurrencyDetails
                country={country}
                countryOptions={countryOptions}
                onCountryChange={(country) => setCountry(country)}
                code={currencyCode}
                currency={currency}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
