//import libraries
import React from "react";
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Header from "./Header";
import Modal from "./Modal";
import VideoGrid from "./VideoGrid";
import GenreFilter from "./GenreFilter";
import RatingFilter from "./RatingFilter";
import SortBy from "./SortBy";
import { config } from "../App";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const LandingPage = () => {
  //create states to keep video list and filtered list
  const { enqueueSnackbar } = useSnackbar();
  let [videoList] = useState([]);
  let [filteredVideoList, setFilteredVideoList] = useState([]);
  let [noVideosFound, setNoVideosFound] = useState(false);
  //modal states
  let initialFormData = {
    videoLink: "",
    previewImage: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: dayjs(new Date()),
  };
  let [formInputs, setFormInputs] = useState(initialFormData);
  let [debounceTimeout, setDebounceTimeout] = useState(null);
  let [modalOpen, setModalOpen] = useState(false);
  //state to keep track of filter event
  let [searchKeys, setSearchKeys] = useState("");
  let [activeRating, setActiveRating] = useState([]);
  let [activeGenres, setActiveGenres] = useState([]);
  let [sortOption, setSortOption] = useState("releaseDate");

  //handle upload button
  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = async () => {
    setFormInputs(initialFormData);
    await fetchVideos();
    setModalOpen(false);
  };

  const handleFormInputs = (event) => {
    if (dayjs.isDayjs(event)) {
      setFormInputs({ ...formInputs, releaseDate: event });
      return;
    }
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
  };

  const performSumbit = async (formData) => {
    //post request
    try {
      let url = `${config.endpoint}`;
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formInputs),
        headers: { "Content-type": "application/json" },
      });
      if (!response.ok) {
        let errorData = await response.json();
        enqueueSnackbar(errorData.message, { variant: "error" });
        return;
      }
      enqueueSnackbar("Video Uploaded Successfully", { variant: "success" });
      await handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleFormSubmit = () => {
    //change date format
    let videoDate = formInputs.releaseDate.format("DD MMM YYYY");
    let formData = { ...formInputs, releaseDate: videoDate };
    //perform API call
    performSumbit(formData);
  };

  // handling search event
  const performSearch = async (key) => {
    try {
      if (key === "") {
        //to go back to original list -CHECK LATER WHEN API AVAILABLE
        setFilteredVideoList(videoList);
        setActiveGenres(["All"]);
        setActiveRating([]);
        return;
      }
      let url = `${config.endpoint}?title=${key}`;
      let response = await fetch(url);
      if (!response.ok) {
        setFilteredVideoList([]);
        setNoVideosFound(true);
        return;
      }
      let data = await response.json();
      setFilteredVideoList(data.videos);
      setActiveGenres(["All"]);
      setActiveRating([]);
      setNoVideosFound(false);

      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const debouncedSearch = (event, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      setDebounceTimeout(null);
    }

    let key = event.target.value;
    setSearchKeys(key);

    let timerId = setTimeout(() => {
      //perform api call on search value
      performSearch(key);
    }, 500);
    setDebounceTimeout(timerId);
  };

  //rating handler
  const handleRatingFilter = (event, newList) => {
    if (!newList) setActiveRating([]);
    else setActiveRating(newList);
  };
  //genre handler
  const handleGenreFilter = (event, newList) => {
    if (newList.length === 0) setActiveGenres(["All"]);
    else if (event.target.value === "All") {
      setActiveGenres(["All"]);
    } else if (newList.includes("All") && newList.length > 1) {
      setActiveGenres(newList.slice(1));
    } else {
      setActiveGenres(newList);
    }
  };

  //handle sort
  const handleSortSelect = (event) => {
    let val = event.target.value;
    setSortOption(val);
  };

  // //main filter function - first do only for search and genre - implement when backend available
  const setQueryBySortOption = (isFiltersPresent) => {
    let query = "";
    if (sortOption === "none") return query;

    if (isFiltersPresent) {
      query += `&sortBy=${sortOption}`;
    } else {
      query += `?sortBy=${sortOption}`;
    }

    return query;
  };
  const setQueryByFilter = () => {
    let query = "";
    if (searchKeys) {
      if (activeGenres.length !== 0 && activeRating.length !== 0) {
        query += `?title=${searchKeys}&genres=${activeGenres.toString()}&contentRating=${encodeURIComponent(
          activeRating.toString()
        )}`;
      } else if (activeGenres.length !== 0) {
        query += `?title=${searchKeys}&genres=${activeGenres.toString()}`;
      } else if (activeRating.length !== 0) {
        query += `?title=${searchKeys}&contentRating=${encodeURIComponent(
          activeRating.toString()
        )}`;
      } else {
        query += `?title=${searchKeys}`;
      }
    } else {
      if (activeGenres.length !== 0 && activeRating.length !== 0) {
        query += `?genres=${activeGenres.toString()}&contentRating=${encodeURIComponent(
          activeRating.toString()
        )}`;
      } else if (activeGenres.length !== 0) {
        query += `?genres=${activeGenres.toString()}`;
      } else if (activeRating.length !== 0) {
        query += `?contentRating=${encodeURIComponent(
          activeRating.toString()
        )}`;
      }
    }

    return query;
  };

  const applyFilterAndSort = async () => {
    console.log("In Filter function");
    // let updatedList = filteredVideoList;
    let url = config.endpoint;
    let queryString = setQueryByFilter();
    let isFiltersPresent = false;
    if (queryString) {
      isFiltersPresent = true;
    }
    queryString += setQueryBySortOption(isFiltersPresent);
    url += queryString;
    //if searchKey present performsearch - temporary active genre condition
    try {
      let response = await fetch(url);
      if (!response.ok) {
        setFilteredVideoList([]);
        setNoVideosFound(true);
        return;
      }
      let data = await response.json();
      setFilteredVideoList(data.videos);
      setNoVideosFound(false);
      return;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const fetchVideos = async () => {
    try {
      let response = await fetch(`${config.endpoint}`);
      let data = await response.json();
      console.log(data.videos);
      // setVideoList(data.videos);
      setFilteredVideoList(data.videos);
    } catch (err) {
      console.log(err);
    }
  };

  //useffect for filters & sort
  useEffect(() => {
    //call filter function
    console.log("filter use effect");
    applyFilterAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRating, activeGenres, sortOption]);

  return (
    <>
      <Box sx={{ backgroundColor: "#202020" }}>
        <Header children>
          {/* implement searchBox  */}
          <Box sx={{ width: 1 / 2 }}>
            <TextField
              className="search-desktop"
              fullWidth
              placeholder="Search"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="adornment">
                    <SearchIcon className="SearchIcon" />
                  </InputAdornment>
                ),
              }}
              value={searchKeys}
              onChange={(e) => debouncedSearch(e, debounceTimeout)}
            />
          </Box>

          {/* upload button */}
          <Box>
            <Button
              sx={{
                color: "white",
                textTransform: "none",
                mr: 0.8,
                backgroundColor: "#4CA3FC",
              }}
              variant="contained"
              size="small"
              id = 'upload-btn'
              startIcon={<UploadIcon />}
              onClick={handleClickOpen}
            >
              Upload
            </Button>
            <Modal
              modalOpen={modalOpen}
              handleClose={handleClose}
              formInputs={formInputs}
              handleFormInputs={handleFormInputs}
              handleFormSubmit={handleFormSubmit}
            />
          </Box>
        </Header>
        {/* mobile view */}
        <TextField
          className="search-mobile"
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="adornment">
                <SearchIcon className="SearchIcon" />
              </InputAdornment>
            ),
          }}
          value={searchKeys}
          onChange={(e) => debouncedSearch(e, debounceTimeout)}
        />
        <Box className="filter-row">
          {/* genre filter buttons */}
          <GenreFilter
            genres={activeGenres}
            handleToggleButtons={handleGenreFilter}
          />
          {/* sortByFilters */}
          <SortBy sortOption={sortOption} handleChange={handleSortSelect} />
        </Box>
        <Box
          sx={{
            mx: "auto",
            maxWidth: "530px",
          }}
        >
          {/* rating filter buttons*/}
          <RatingFilter
            rating={activeRating}
            handleRatingButtons={handleRatingFilter}
          />
        </Box>
      </Box>
      {/*Grid of videos */}
      <Box className="contentBox">
        {noVideosFound ? (
          <Box className="not-found-box">
            <SentimentDissatisfiedIcon fontSize="medium" color="primary" />
            <Typography color="primary">No Videos Avaialable</Typography>
          </Box>
        ) : (
          <VideoGrid videoList={filteredVideoList} />
        )}
      </Box>
    </>
  );
};

export default LandingPage;
