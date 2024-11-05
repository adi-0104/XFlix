import React from "react";
import { genreList } from "../utils/filters";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./genreFilter.css";
const GenreFilter = ({ genres, handleToggleButtons }) => {
  return (
    <ToggleButtonGroup
      exclusive={false}
      className="genre-button-group"
      value={genres}
      onChange={handleToggleButtons}
    >
      <ToggleButton size="small" value="All" className="genre-button">
        All Genres
      </ToggleButton>
      {genreList.map((genre, idx) => (
        <ToggleButton
          key={idx}
          size="small"
          value={genre}
          className="genre-btn genre-button"
        >
          {genre}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default GenreFilter;
