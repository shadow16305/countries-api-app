import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTheme from "../store/ThemeContext";
import arrow from "../assets/call-made.svg";

const Details = () => {
  const [detailedCountryData, setDetailedCountryData] = useState([]);
  const { countryName } = useParams();
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchedDetailedCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setDetailedCountryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchedDetailedCountryData();
  }, []);

  const country = detailedCountryData.find(
    (country) => country.name.common === countryName
  );

  return (
    <div className="flex flex-col gap-y-20 h-screen container mx-auto justify-center">
      <Link
        to="/"
        className={`w-[136px] h-[40px] rounded-md text-center flex justify-center items-center gap-x-3 ${
          isDark ? "bg-[#2B3844]" : "bg-white"
        }`}
      >
        <img src={arrow} alt="Go Back" className={`${!isDark && "invert"}`} />{" "}
        Back
      </Link>
      <div className="flex flex-col lg:flex-row gap-x-36 items-center justify-center font-['Nunito Sans'] relative">
        {country && (
          <>
            <div className="flex flex-col gap-y-20">
              <img
                src={country.flags.svg}
                className="w-[560px] h-[401px]"
                alt="flag"
              />
            </div>
            <div className="flex flex-col items-center lg:items-start mt-10 lg:mt-0">
              <h1
                className={`text-[32px] font-extrabold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {country.name.common}
              </h1>
              <div className="flex flex-col lg:flex-row gap-x-28 mt-6">
                <div className="flex flex-col gap-y-2">
                  {Object.entries({
                    "Native Name": country.name.official,
                    Population: country.population,
                    Region: country.region,
                    Subregion: country.subregion,
                    Capital: country.capital,
                  }).map(([key, value], index) => (
                    <p key={index}>
                      <span className="font-semibold">{key}: </span>
                      <span className="font-light">{value}</span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-y-2">
                  <p>
                    <span className="font-semibold">Top Level Domain: </span>
                    <span className="font-light"> {country.tld[0]} </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      Currencies:{" "}
                      {country.currencies &&
                        Object.keys(country.currencies).map(
                          (currencyCode, index) => (
                            <span key={index} className="font-light">
                              {country.currencies[currencyCode].name}
                              {index <
                                Object.keys(country.currencies).length - 1 &&
                                ", "}
                            </span>
                          )
                        )}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Languages: </span>
                    {country.languages &&
                      Object.keys(country.languages).map(
                        (languageCode, index) => (
                          <span key={index}>
                            {country.languages[languageCode]}
                            {index <
                              Object.keys(country.languages).length - 1 && ", "}
                          </span>
                        )
                      )}
                  </p>
                </div>
              </div>
              <div className="mt-20">
                <p className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 max-w-[800px]">
                  Border Countries:{" "}
                  {country.borders ? (
                    country.borders.map((borderCode, index) => {
                      const borderCountry = detailedCountryData.find(
                        (country) => country.cca3 === borderCode
                      );
                      return (
                        <Link
                          key={index}
                          to={`/${borderCountry.name.common}`}
                          className={`px-2 py-1 mx-1 rounded-md ${
                            isDark ? "bg-[#2B3844]" : "bg-white"
                          }`}
                        >
                          {borderCountry.name.common}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="ps-1">None</p>
                  )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
