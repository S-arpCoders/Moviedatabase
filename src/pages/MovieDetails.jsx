import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>No movie data available.</div>;
    }

    const { title, description, posterUrl } = state;

    return (
        <div className="movie-details-page">
            <img className="movie-details-poster" src={posterUrl} alt={`${title} Poster`} />
            <h1 className="movie-details-title">{title}</h1>
            <p className="movie-details-description">{description}</p>
        </div>
    );
};

export default MovieDetails;
