import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ isDark, value }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchedCardData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const formattedData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
          population: country.population,
          region: country.region,
          capital: country.capital,
        }));

        setCountriesData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchedCardData();
  }, []);

  const { searchValue, regionValue } = value;

  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      country.region.toLowerCase().includes(regionValue.toLowerCase())
  );

  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-20 mt-12">
      {filteredCountries.map((country, index) => (
        <Link
          to={`/${country.name}`}
          key={index}
          className={`font-['Nunito Sans'] rounded-[5px] pb-12 w-[320px] ${
            isDark ? "bg-[#2B3844]" : "bg-white"
          }`}
        >
          <img src={country.flag} alt="Flag" className="w-full h-[160px]" />
          <div className="ps-6 pt-6">
            <h1 className="text-lg font-extrabold max-w-[60%]">
              {country.name}
            </h1>
            <p className="mt-4">
              <span className="font-semibold">Population:</span>{" "}
              {country.population}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span> {country.capital}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
