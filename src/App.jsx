import React, { useEffect, useState } from "react";
import { InputBox, CurrencyDetails } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import CountryData from "./currencyData";
import GitHubIcon from "@mui/icons-material/GitHub";

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
    setCurrency(currentCountry);
  }, [country]);

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
    const res = amount * rate[to];
    setConvertedAmount(res.toFixed(2));
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/8370426/pexels-photo-8370426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <a
        href="#"
        onClick={() => window.location.reload()}
        className="absolute top-6 md:top-3  left-3"
      >
        <h1 className="font-extrabold text-blue-100 font-archivo text-2xl lg:text-4xl self-start">
          MoneyMatrix
        </h1>
      </a>
      <div className="w-full">
        <div className=" sm:w-1/2 h-auto mx-2 sm:mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <div className="mb-3 ">
            <p className="text-md lg:text-xl text-white font-extrabold uppercase">
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
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 lg:px-4 lg:py-1 lg:text-xl text-sm"
                onClick={swap}
              >
                Swap
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
              className="w-full bg-blue-600 text-white py-2 md:py-4 rounded-lg lg:text-2xl font-bold text-md"
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
      <a
        href="https://github.com/Subashh-Chaudhary/MoneyMatrix"
        target="_blank"
      >
        <div className="text-blue-100 absolute bottom-20 right-4 lg:bottom-10 lg:right-12 flex gap-2 items-center">
          <GitHubIcon fontSize="large" />
          <p className="lg:text-xl  text-[13px] md:text-lg text-blue-100 font-archivo font-extrabold">
            GitHub Repository
          </p>
        </div>
      </a>
    </div>
  );
}

export default App;
