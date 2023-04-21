import { useState, useEffect } from "react";
import countryDataRetriever from "./services/countries";
import Country from "./components/Country";
import CountryInfo from "./components/CountryInfo";
import CountryWeather from "./components/CountryWeather";

const App = () => {
  const [countriesList, setCountries] = useState(null);
  const [selectedCountry, selectCountry] = useState(null);
  const [countryWeather, setWeather] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      countryDataRetriever
        .getCountryByName(search)
        .then((countries) => {
          setCountries(countries);
        })
        .catch((error) => {
          console.log("invalid request, no results");
        });
    } else {
      countryDataRetriever.getAllCountries().then((countries) => {
        setCountries(countries);
      });
    }
  }, [search]);

  if (!countriesList) {
    return null;
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
    searchRender(countriesList);
  };

  const handleSelect = (country) => {
    countryDataRetriever.getCountryByName(country).then((returnedCountry) => {
      console.log("Returning data");
      countryDataRetriever
        .getCountryWeatherData(
          returnedCountry[0].capitalInfo.latlng[0],
          returnedCountry[0].capitalInfo.latlng[1]
        )
        .then((weatherInfo) => {
          setWeather(weatherInfo);
          selectCountry(returnedCountry);
        });
    });

    console.log("Country set to: ", country);
  };

  const searchRender = (countriesList) => {
    if (countriesList.length === 1) {
      console.log("found result, ", countriesList);
      const country = countriesList[0];
      countryDataRetriever
        .getCountryWeatherData(
          country.capitalInfo.latlng[0],
          country.capitalInfo.latlng[1]
        )
        .then((weatherInfo) => {
          console.log("Got weather Info, ", weatherInfo);
          setWeather(weatherInfo);
        });
    } else {
      selectCountry(null);
    }
  };

  const renderType =
    search === "" ? (
      `To begin using, enter a search into the textbox`
    ) : (
      <Country
        countries={countriesList}
        countryButton={handleSelect}
        weatherInfo={countryWeather}
      ></Country>
    );
  const ifCountrySelected =
    selectedCountry !== null
      ? (console.log("CountryInfo using country :", selectedCountry),
        (
          // Country Info gets returned as array for some reason, so hence janky value extraction
          <div>
            <CountryInfo
              countryName={selectedCountry[0].name.common}
              capital={selectedCountry[0].capital[0]}
              area={selectedCountry[0].area}
              languages={Object.values(selectedCountry[0].languages)}
              flag={selectedCountry[0].flags.png}
              flagAlt={selectedCountry[0].flags.alt}
            ></CountryInfo>
            <CountryWeather weatherData={countryWeather}></CountryWeather>
          </div>
        ))
      : ``;
  return (
    <div className="App">
      Search for a country here
      <input value={search} onChange={handleSearch}></input>
      <div>{renderType}</div>
      <div>{ifCountrySelected}</div>
    </div>
  );
};

export default App;
