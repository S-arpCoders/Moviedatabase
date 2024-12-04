import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowDetails.css";
import {SearchShowDetails} from "../../services/api";

const ShowDetails = () => {
    const { id } = useParams();  // Get movie id from the URL
    const [show, setShow] = useState(null);

    useEffect(() => {
        const getShowData = async () => {
            const showData = await SearchShowDetails(id);
            setShow(showData);
        };

        getShowData();
    }, [id]);

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details-page">
            <div className="left-section">
                <img className="movie-details-poster" src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={`${show.name} Poster`} />
            </div>
            <div className="right-section">
                <h1 className="movie-details-title">{show.title}</h1>
                <div className="movie-details-overview">
                    <h2>Overview</h2>
                    <p className="movie-details-description">{show.overview}</p>
                    <p className="movie-details-tagline"> {show.tagline}</p>
                </div>
            </div>
        </div>
    );
};

export default ShowDetails;
