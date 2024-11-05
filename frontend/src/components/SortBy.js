import React from 'react';
import {InputAdornment} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwapVertSharpIcon from '@mui/icons-material/SwapVertSharp';
import "./sortBy.css"

const SortBy = ({sortOption, handleChange}) => {
  
    return (
        <FormControl className="wrapper" sx={{ minWidth: 120 , b:0 }}>
          <Select
          className='select-button sort-select'
          IconComponent={() => null}
        startAdornment={
            <InputAdornment position="start" className="adornment">
              <SwapVertSharpIcon fontSize='small' className='swap-icon'/>
            </InputAdornment>
          }
          variant="outlined"
            value={sortOption}
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem value='none'>None</MenuItem>
            <MenuItem value='releaseDate' id="release-date-option">Release Date</MenuItem>
            <MenuItem value='viewCount' id="view-count-option">View Count</MenuItem>
          </Select>
        </FormControl>
    );
}

export default SortBy