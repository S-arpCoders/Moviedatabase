import React from 'react';
import './ShowCard.css';
import {useNavigate} from "react-router-dom";

const ShowCard = ({ id, title, description,tagline, posterUrl, rating, releaseDate }) => {

    const navigate = useNavigate();

    let percentage = Math.ceil((rating / 10) * 100);
    console.log(rating);

    const handleViewMore = () => {
        navigate(`/tv/${id}`);
    };
    return (
        <div className="movie-card">
            <div className="poster-image">
                <img className="movie-poster" src={posterUrl} alt={ title} onClick={handleViewMore}/>
                <div className="rating-circle">
                    <span>{percentage}%</span>

                </div>
            </div>
            <div className="movie-details">
                <h3>{title}</h3>
                <p>{releaseDate}</p>
            </div>

        </div>
    );
};

export default ShowCard;
