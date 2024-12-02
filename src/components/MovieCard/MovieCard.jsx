import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, description, posterUrl }) => {
    return (
        <div className="movie-card">
            <img className="movie-poster" src={posterUrl} alt={`${title} Poster`} />
            <div className="movie-details">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-description">{description}</p>
                <button className="movie-button">View More</button>
            </div>
        </div>
    );
};

export default MovieCard;
