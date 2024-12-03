import React from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>No movie data available.</div>;
    }

    const { title, description, posterUrl } = state;

    return (
        <div className="movie-details-page">
            <div className="left-section">
                <img className="movie-details-poster" src={posterUrl} alt={`${title} Poster`} />
            </div>
            <div className="right-section">
                <h1 className="movie-details-title">{title}</h1>
                <div className="movie-details-overview">
                    <h2>Overview</h2>
                    <p className="movie-details-description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
