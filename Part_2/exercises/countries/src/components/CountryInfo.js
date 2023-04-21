const CountryInfo = ({
  countryName,
  capital,
  area,
  languages,
  flag,
  flagAlt,
}) => {
  return (
    <div>
      <h1>{countryName}</h1>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang.id}>{lang}</li>
        ))}
      </ul>
      <img src={flag} alt={flagAlt}></img>
      <h1>Weather in {capital}</h1>
    </div>
  );
};

export default CountryInfo;
