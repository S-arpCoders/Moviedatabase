import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard/MovieCard";


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer  ${process.env.REACT_APP_API_KEY}`
    }
  };


const HomePage = () => {
  const [apifetch, setApifetch] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApifetch(data.results);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!apifetch) {
    return <div>Loading...</div>;
  }

    return (
        <div className="App">
            <center>
                <div className="movie-list">
                    {apifetch.map((dataObj, index) => {
                        const posterUrl = dataObj.poster_path
                            ? `https://image.tmdb.org/t/p/w500${dataObj.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image if no poster

                        return (
                            <MovieCard
                                key={index}
                                title={dataObj.title}
                                description={dataObj.overview}
                                posterUrl={posterUrl}
                            />
                        );
                    })}
                </div>
            </center>
        </div>
    );
}

export default HomePage
