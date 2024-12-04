import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import { SearchMovieDetails, SearchMovieCredits } from "../../services/api";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getMovieData = async () => {
            // Fetch movie details
            const movieData = await SearchMovieDetails(id);
            setMovie(movieData);

            // Fetch cast details
            const credits = await SearchMovieCredits(id);
            setCast(credits.cast);
        };

        getMovieData();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div className="movie-details-page">
            <div className="left-section">
                <img
                    className="movie-details-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                />
            </div>
            <div className="right-section">
                <h1 className="movie-details-title">{movie.title}</h1>
                <div className="movie-details-overview">
                    <h2>Overview</h2>
                    <p className="movie-details-description">{movie.overview}</p>
                    <h3>Tagline</h3>
                    <p className="movie-details-tagline">{movie.tagline}</p>
                </div>
            </div>
        </div>
    <div className="movie-cast">
        <h2>Cast</h2>
        <div className="cast-grid">
            {(cast || []).slice(0, 10).map((actor) => (
                <div key={actor.id} className="cast-member">
                    <img
                        className="cast-photo"
                        src={
                            actor.profile_path
                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        alt={actor.name}
                    />
                    <p className="cast-name">{actor.name}</p>
                </div>
            ))}
        </div>
    </div>
    </div>
)
    ;
};

export default MovieDetails;
