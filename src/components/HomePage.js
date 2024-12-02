import { useState, useEffect } from 'react';



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
        {apifetch.map((dataObj, index) => {
             const posterUrl = dataObj.poster_path
             ? `https://image.tmdb.org/t/p/w500${dataObj.poster_path}`
             : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image if no poster
 
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#CD8FFD",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
                 <img
                src={posterUrl}
                alt={dataObj.title}
                style={{
                  width: '100%',
                  borderRadius: 10,
                }}
              />
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.title}</p>
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.poster_path}</p>
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.popularity}</p>
            </div>
          );
        })}
      </center>
    </div>
  );
}

export default HomePage
