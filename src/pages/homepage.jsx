import React, { useEffect, useState } from 'react';
import { fetchPopularShows, fetchPopularMovies, SearchMovie } from '../services/api';
import MovieCard from "../components/MovieCard/MovieCard";
import Navbar from "../components/Navbar/Navbar";

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
                <form onSubmit={handleInputChange} style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a movie..."
                        style={{ padding: '20px', width: '300px' }}
                    />
                    <button type="submit" style={{ padding: '10px' }}>Search</button>
                </form>

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
                        <h1 id="movies">Popular Movies</h1>
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

                        <h1 id="shows">Popular TV Shows</h1>
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
                    </>
                )}
            </center>
        </div>
    );
};

export default Homepage;
