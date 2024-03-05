import React from "react";

function CurrencyDetails({
  country,
  onCountryChange,
  countryOptions = [],
  currency,
  onCurrencyChange,
  code,
  onCodeChange,
  disabled = true,
}) {

  return (
    <div className="mt-3 bg-white p-3 rounded-lg text-sm md:text-xl flex gap-4">
      <div className="md:w-2/6">
        <label className="text-slate-700 font-extrabold">Country Name:</label>
        <select
          className="outline-none w-full bg-slate-200 py-2 rounded-md px-1 mt-2 text-md"
          value={country}
          onChange={(e) => onCountryChange && onCountryChange(e.target.value)}
        >
          {countryOptions.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-1/6">
        <label className="text-slate-700 font-extrabold">Code:</label>
        <input
          type="text"
          className="outline-none w-full bg-slate-200 py-2 rounded-md px-1 mt-2 text-md"
          value={code}
          onChange={(e) => onCodeChange && onCodeChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="md:w-3/6">
        <label className="text-slate-700 font-extrabold">Currency Name:</label>
        <input
          type="text"
          className="outline-none w-full bg-slate-200 py-2 rounded-md px-1 mt-2 text-md"
          value={currency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default CurrencyDetails;
