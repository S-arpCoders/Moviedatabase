import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import { SearchMovieDetails, SearchMovieCredits ,movieTrailer } from "../../services/api";


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer ,setTrailer]=useState([]);

    useEffect(() => {
        const getMovieData = async () => {
            // Fetch movie details
            const movieData = await SearchMovieDetails(id);
            setMovie(movieData);

            // Fetch cast details
            const credits = await SearchMovieCredits(id);
            setCast(credits.cast);

            //trailer
           // const Trailerurl=await movieTrailer(id);

            const fetchTrailerKeys = async () => {
                const Trailerurl = await movieTrailer(id);
                // Check if there are any results
                if (Trailerurl.results.length > 0) {
                    // Loop through the results array and extract the key for each item
                    const trailerKeys = Trailerurl.results.map((item) => item.key);

                    // You can log the keys or do something else with them
                  console.log(trailerKeys);

                    // Optionally, set the first trailer's key or do something specific
                    setTrailer(trailerKeys[trailerKeys.length - 1]);  // This sets the last key
                    console.log(Trailerurl.results);
                } else {
                    console.log('No trailers available');
                }
            };

// Call the function
            fetchTrailerKeys();


            /*end of chat code
            * */
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
                <div className="trailer-section">
                    <h2>Trailer</h2>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

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
