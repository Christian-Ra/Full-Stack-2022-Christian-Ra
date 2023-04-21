import Button from "./Button";
import CountryInfo from "./CountryInfo";
import CountryWeather from "./CountryWeather";

const Country = ({ countries, countryButton, weatherInfo }) => {
  console.log("countries list: ", countries);
  const country = countries[0];
  if (countries.length === 1) {
    const name = country.name.common;
    const capital = country.capital[0];
    const area = country.area;
    const languages = Object.values(country.languages);
    const flag = country.flags.png;
    const flagAlt = country.flags.alt;
    return (
      <div>
        <CountryInfo
          countryName={name}
          capital={capital}
          area={area}
          languages={languages}
          flag={flag}
          flagAlt={flagAlt}
        ></CountryInfo>
        <CountryWeather weatherData={weatherInfo}></CountryWeather>
      </div>
    );
  } else if (countries.length <= 10) {
    return (
      <div>
        <h2>List of results</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.id}>
              {country.name.official}
              <Button eventHandler={() => countryButton(country.name.common)}>
                Select
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p>Too many results. Please enter a more specific search</p>;
};

export default Country;
