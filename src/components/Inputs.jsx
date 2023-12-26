import { useState } from "react";

import search from "../assets/search.svg";

const Inputs = ({ isDark, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const { searchValue, setSearchValue, setRegionValue } = value;

  const countrySearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  let inputThemeClasses = "bg-white";

  if (isDark) {
    inputThemeClasses = "bg-[#2B3844]";
  }

  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between relative px-4 md:px-0">
      <div
        className={`flex items-center justify-center lg:justify-start gap-6 md:w-[480px] max-h-[56px] px-8 py-4 rounded-md ${inputThemeClasses}`}
      >
        <button>
          <img
            src={search}
            className={`${!isDark && "invert"}`}
            alt="search icon"
          />
        </button>
        <input
          type="text"
          value={searchValue}
          onChange={countrySearchChange}
          placeholder="Search for a country..."
          className="bg-transparent focus:outline-none w-[90%]"
        />
      </div>
      <div className="lg:absolute lg:right-0 mt-10 md:mt-0">
        <button
          onClick={dropdownClickHandler}
          className={`px-8 py-4 rounded-md ${inputThemeClasses}`}
        >
          Filter by Region
        </button>

        <div
          className={`flex flex-col items-start gap-y-2 px-6 md:pl-6 py-4 mt-1 rounded-md transition-all duration-300 absolute md:relative ${inputThemeClasses} ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <button onClick={() => setRegionValue("") || setIsOpen(false)}>
            None
          </button>
          <button onClick={() => setRegionValue("Africa") || setIsOpen(false)}>
            Africa
          </button>
          <button onClick={() => setRegionValue("America") || setIsOpen(false)}>
            America
          </button>
          <button onClick={() => setRegionValue("Asia") || setIsOpen(false)}>
            Asia
          </button>
          <button onClick={() => setRegionValue("Europe") || setIsOpen(false)}>
            Europe
          </button>
          <button onClick={() => setRegionValue("Oceania") || setIsOpen(false)}>
            Oceania
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
