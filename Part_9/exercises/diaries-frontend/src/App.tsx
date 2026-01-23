import type { Diary, ValidationError } from './types';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const diariesBaseUrl = 'http://localhost:3000/api/diaries';

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get<Diary[]>(diariesBaseUrl).then(response => {
      setDiaries(response.data);
    }).catch(error => {
      console.error('Error fetching diaries:', error);
    });
  }, []);

  const handleSubmit =  (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date,
      visibility,
      weather,
      comment
    };
    axios.post<Diary>(diariesBaseUrl, newDiary).then(response => {
      setDiaries(diaries.concat(response.data));
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    }).catch(error => {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log('Axios error status: ', error.status);
        console.error('Error message: ', error.response?.data);
        setErrorMessage(String(error.response?.data));
      } else {
        console.error('Unexpected error: ', error);
      }
    });
   };

  return (
    <>
      <div>
        <h1>{errorMessage}</h1>
        <h2>Add New Diary Entry</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            Visibility:
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'great'}
              onChange={() => setVisibility('great')}
            />
            Great
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'good'}
              onChange={() => setVisibility('good')}
            />
            Good
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'ok'}
              onChange={() => setVisibility('ok')}
            />
            OK
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'poor'}
              onChange={() => setVisibility('poor')}
            />
            Poor
          </div>
          <div>
            Weather:
            <input
              type="radio"
              name="weather"
              checked={weather === 'sunny'}
              onChange={() => setWeather('sunny')}
            />
            Sunny
            <input
              type="radio"
              name="weather"
              checked={weather === 'rainy'}
              onChange={() => setWeather('rainy')}
            />
            Rainy
            <input
              type="radio"
              name="weather"
              checked={weather === 'cloudy'}
              onChange={() => setWeather('cloudy')}
            />
            Cloudy
            <input
              type="radio"
              name="weather"
              checked={weather === 'stormy'}
              onChange={() => setWeather('stormy')}
            />
            Stormy
            <input
              type="radio"
              name="weather"
              checked={weather === 'windy'}
              onChange={() => setWeather('windy')}
            />
            Windy
          </div>
          <div>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Add Diary</button>
        </form>
      </div>
      <div>
        <h2>Diary Entries</h2>
        {diaries.map(diary => 
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p>comment: {diary.comment}</p>
          </div>
        )}
      </div>
    </>
  );

  
};

export default App;
