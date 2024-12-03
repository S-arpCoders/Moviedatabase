const fetchData = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//Popular movies
export const fetchPopularMovies = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    return await fetchData(url);
};

//Upcoming Movies
export const fetchUpComingMovie = async (page = 1)  =>
{
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`
    return await fetchData(url);
}

//Popular TV shows
export const fetchPopularShows = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    return await fetchData(url);
};


//search
export const SearchMovie = async (query) => {
    const url =`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    return await fetchData(url);
}

//Movie Details
export const SearchMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    return await fetchData(url);
    }
//Movie Details
export const SearchShowDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/tv/${id}`;
    return await fetchData(url);
    }
