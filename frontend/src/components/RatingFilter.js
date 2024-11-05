import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ratingList } from '../utils/filters';
import "./ratingFilter.css"

function RatingFilter({ rating, handleRatingButtons}) {
  return (
    <ToggleButtonGroup
      exclusive={true}
      className="rating-button-group"
      value={rating}
      onChange={handleRatingButtons}
    >
        <ToggleButton
          size="small"
          value="Anyone"
          className="rating-button content-rating-btn"
        >
          Any Age Group
        </ToggleButton>
      {ratingList.map((rating, idx) => {
        if(rating === "Anyone") return null;
        return (<ToggleButton
            key={idx}
            size="small"
            value={rating}
            className="rating-button content-rating-btn"
          >
            {rating}
          </ToggleButton>)
      })}
    </ToggleButtonGroup>
  );
}

export default RatingFilter