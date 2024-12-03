import React, { useEffect, useState } from 'react';
import { fetchPopularShows, fetchPopularMovies, SearchMovie } from '../services/api';
import MovieCard from "../components/MovieCard/MovieCard";
import Navbar from "../components/Navbar/Navbar";
import './center.css';


const Homepage = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const movieData = await fetchPopularMovies();
                setMovies(movieData.results);
            } catch (err) {
                setError(err.message);
            }
        };

        const loadShows = async () => {
            try {
                const showData = await fetchPopularShows();
                setShows(showData.results);
            } catch (err) {
                setError(err.message);
            }
        };

        loadMovies();
        loadShows();
    }, []);



    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setSearchResults([]); // Clear search results if query is empty
                return;
            }
            try {
                const searchData = await SearchMovie(query);
                setSearchResults(searchData.results);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSearchResults();
    }, [query]);


    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <Navbar />

            <center>
                <div className="search-container">
                    <form onSubmit={handleInputChange} style={{marginBottom: '20px'}}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '820px', // Adjust to match the input's width + button
                            marginTop: '20px',
                        }}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for a movie..."
                                style={{
                                    padding: '15px',
                                    width: '100%',
                                    borderRadius: '20px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                    fontSize: '16px',
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: 'absolute',
                                    right: '-32px', // Slight padding from the edge
                                    top: '50%',
                                    transform: 'translateY(-50%)', // Center vertically
                                    padding: '15px 20px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
                            >
                                Search
                            </button>
                        </div>


                    </form>
                </div>
                    {searchResults.length > 0 ? (
                        <>
                            <h1 id="search-results">Search Results</h1>
                            <div className="movie-list">
                                {searchResults.map((movie, index) => {
                                    const posterUrl = movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image if no poster

                                    return (
                                        <MovieCard
                                            key={index}
                                            id={movie.id}
                                            title={movie.title || movie.name} // `name` for TV shows
                                            description={movie.overview}
                                            posterUrl={posterUrl}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="container">
                                <div className="column">
                                    <h1 id="movies"> Movies</h1>
                                    <div className="movie-list">
                                        {movies.map((movie, index) => {
                                            const posterUrl = movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image if no poster

                                            return (
                                                <MovieCard
                                                    key={index}
                                                    id={movie.id}
                                                    title={movie.title}
                                                    description={movie.overview}
                                                    posterUrl={posterUrl}
                                                />
                                            );
                                        })}
                                    </div>

                                </div>
                                <div className="column">
                                    <h1 id="shows"> TV Shows</h1>
                                    <div className="movie-list">
                                        {shows.map((show, index) => {
                                            const posterUrl = show.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                                : 'https://via.placeholder.com/500x750?text=No+Image'; // Placeholder image if no poster

                                            return (
                                                <MovieCard
                                                    key={index}
                                                    id={show.id}
                                                    title={show.name} // `name` for TV shows
                                                    description={show.overview}
                                                    posterUrl={posterUrl}
                                                />
                                            );
                                        })}
                                    </div>

                                </div>
                                <div className="column">
                                    <h2>Animation</h2>
                                    <p>This is the third column.</p>
                                </div>
                            </div>


                        </>
                    )}
            </center>
        </div>
);
};

export default Homepage;
