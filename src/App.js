import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Homepage from "./pages/homepage";
import ShowDetails from "./components/ShowDetails/ShowDetails";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<ShowDetails />} />
        </Routes>
      </Router>
  );
};

export default App;
