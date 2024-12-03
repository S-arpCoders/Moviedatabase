import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Homepage from "./pages/homepage";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
  );
};

export default App;
