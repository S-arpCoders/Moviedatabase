import React from 'react';
import './MovieCard.css';
import {useNavigate} from "react-router-dom";

const MovieCard = ({ id, title, description,tagline, posterUrl }) => {

    const navigate = useNavigate();

    const handleViewMore = () => {

        navigate(`/movie/${id}`);
    };
    return (
        <div className="movie-card">
            <img className="movie-poster" src={posterUrl} alt={`${title} Poster`} />
            <div className="movie-details">
                <h3 className="movie-title">{title}</h3>
                <p className="movie-description">{description}</p>
                <p className="movie-tagline">{tagline}</p>
                <button className="movie-button" onClick={handleViewMore}>
                    View More
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
