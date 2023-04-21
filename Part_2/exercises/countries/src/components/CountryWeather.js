const CountryWeather = ({ weatherData }) => {
  const temperature = weatherData.main.temp;
  const wind = weatherData.wind.speed;
  const iconCode = weatherData.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <p>Temperature: {temperature} Farhenheit</p>
      <img src={weatherIconUrl} alt="Weathericon"></img>
      <p>Wind: {wind} mph</p>
    </div>
  );
};

export default CountryWeather;
