import React, { useEffect, useState } from 'react';
import { fetchPopularShows, fetchPopularMovies } from '../services/api';
import MovieCard from "../components/MovieCard/MovieCard";
import Navbar from "../components/Navbar/Navbar";

const Homepage = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
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

    if (error) return <div>Error: {error}</div>;

    return (

        <div className="App">
            <Navbar/>
            <center>
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
            </center>
            <center>
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
                                title={show.title}
                                description={show.overview}
                                posterUrl={posterUrl}
                            />
                        );
                    })}
                </div>
            </center>
        </div>

    )
        ;
};

export default Homepage;
