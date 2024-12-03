import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import {SearchMovieDetails} from "../../services/api";

const MovieDetails = () => {
    const { id } = useParams();  // Get movie id from the URL
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovieData = async () => {
            const movieData = await SearchMovieDetails(id);
            setMovie(movieData);
        };

        getMovieData();
    }, [id]);  // Re-fetch if the id changes

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details-page">
            <div className="left-section">
                <img className="movie-details-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
            </div>
            <div className="right-section">
                <h1 className="movie-details-title">{movie.title}</h1>
                <div className="movie-details-overview">
                    <h2>Overview</h2>
                    <p className="movie-details-description">{movie.overview}</p>
                    <p className="movie-details-tagline"> {movie.tagline}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
