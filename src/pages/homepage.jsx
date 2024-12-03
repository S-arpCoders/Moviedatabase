import React, { useEffect, useState } from 'react';
import { fetchPopularShows, fetchPopularMovies, SearchMovie } from '../services/api';
import MovieCard from "../components/MovieCard/MovieCard";
import Navbar from "../components/Navbar/Navbar";
import './center.css';
import chucky from "../images/chucky.jpg";
import deadpo from "../images/deadpo.jpg";
import movie from "../images/movie.jpg";
import spider from "../images/spider.jpg";
import cartoon from "../images/cartoon.jpg";
import studio from "../images/studio.jpg";

const Homepage = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [chucky, deadpo, movie, spider,cartoon,studio];

    // Fetch popular movies and shows on component mount
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

    // Fetch search results whenever the query changes
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

    // Handle image slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // 4 seconds per image

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images.length]);

    // Handle input change
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <Navbar />
            <center>
                {/* Search Section */}
                <div
                    className="search-container"
                    style={{
                        background: `url(${images[currentImageIndex]}) no-repeat center center/cover`,
                        transition: 'background 1s ease-in-out',
                        height: '40vh', // Adjust height to your preference
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '20px' }}>
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                                width: '820px', // Adjust to match the input's width + button
                                marginTop: '20px',
                            }}
                        >
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
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

                {/* Results Section */}
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
                    <div className="container">
                        {/* Movies Section */}
                        <div className="column">
                            <h1 id="movies"> Movies</h1>
                            <div className="movie-list">
                                {movies.map((movie, index) => {
                                    const posterUrl = movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : 'https://via.placeholder.com/500x750?text=No+Image';

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

                        {/* Shows Section */}
                        <div className="column">
                            <h1 id="shows"> TV Shows</h1>
                            <div className="movie-list">
                                {shows.map((show, index) => {
                                    const posterUrl = show.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                        : 'https://via.placeholder.com/500x750?text=No+Image';

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
                    </div>
                )}
            </center>
        </div>
    );
};

export default Homepage;
