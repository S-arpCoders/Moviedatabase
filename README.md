# Movie Database Project 🎥

This project is a React-based web application that allows users to explore popular movies and TV shows,
search for specific movies, view trailers, and get detailed information. It utilizes The Movie Database (TMDB) API for data retriev

The project is already hosted on Render and accessible at: 
- 🔗[Movie Database - Live Link](https://moviedatabase-2xv0.onrender.com/)



## Features ✨
- **Popular Movies**: Displays a list of trending movies.
- **Popular TV Shows**: Shows a list of trending TV shows.
- **Search Functionality**: Allows users to search for movies by title.
- **Dynamic Data Fetching**: Retrieves data dynamically using TMDB API.
- **Responsive Design**: Optimized for various devices and screen sizes.
- **Movie Trailers**: Displays the trailer for the selected movie.

## Tech Stack 🛠️

- **Frontend**: React, JSX, CSS
- **Backend API**: TMDB API
- **State Management**: React Hooks (useState, useEffect)
- **Environment Variables**: .env for managing API keys securely.
- **Deployment**: Render

## Installation and Setup 🚀

## Prerequisites

Node.js and npm installed on your machine.
A TMDB API Key. Sign up at TMDB API to get your key.

## Steps

**Clone this repository:**
git clone https://github.com/S-arpCoders/Moviedatabase.git
cd Moviedatabase

**Install dependencies:**
npm install

Create a .env file in the root directory and add your TMDB API key:
REACT_APP_API_KEY=<your-tmdb-api-key>

Start the development server:
npm start

Open http://localhost:3000 in your browser.

## Deployment on Render 🌐

To deploy the project live using Render, follow these steps:

Push your code to GitHub if not already done:
  git push origin main

- Log in to Render and click New > Static Site.
- Connect your GitHub repository by authorizing Render.
- Select the Moviedatabase repository from the list.
- Specify the following build and deployment settings:
- **Build Command**: npm install && npm run build
- **Publish Directory:** build
- Add the environment variable REACT_APP_API_KEY with your TMDB API key.
- Click Deploy and wait for the deployment process to complete.
Your project will be live at the generated Render URL. You can customize this URL in Render's settings.
The project is already deployed and accessible at [Movie Database](https://moviedatabase-2xv0.onrender.com/).

## Future Improvements 🔧
- Implement a loading spinner for a better user experience during data fetches.
- Include a favorites feature for users to save their favorite movies.
- Enhance error handling for API failures.
- Add movie recommendations based on user activity.

## Acknowledgments 🙏
- Special thanks to TMDB for providing an excellent API for movie and TV show data.
- This project was inspired by a React learning module focused on state management and routing.
