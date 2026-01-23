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
              type="text"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            />
          </div>
          <div>
            Weather:
            <input
              type="text"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
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
