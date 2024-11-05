import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { config } from "../App";
import { Box, Card } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircleIcon from "@mui/icons-material/Circle";
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Typography from "@mui/material/Typography";
import "./videoPage.css";
import VideoGrid from "./VideoGrid";

const VideoPage = () => {
  const params = useParams();
  const id = params.id;

  let [currentVideo, setCurrentVideo] = useState(null);
  let [videosList,setVideosList] = useState([])
  //set button states
  let [activeButtons, setActiveButtons] = useState([]);

  const patchVideoVotes = async (voteObj) => {
    try{
      let url = `${config.endpoint}/${id}/votes`
      let response = await fetch(url,{
        method: "PATCH",
        body: JSON.stringify(voteObj),
        headers: {"Content-type": "application/json"}
      });
      if (!response.ok) {
        return;
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  
  const handleActionButtons = (event, newList) => {
    if (!newList) {
      setActiveButtons([]);
      return;
    } else setActiveButtons(newList);
    //send patch request
    let currentUpvotes = currentVideo.votes.upVotes;
    let currentDownvotes = currentVideo.votes.downVotes;
    let value = event.currentTarget.value;
    let voteObj = {};
    if (newList.includes("upVote") && value === "upVote") {
      setCurrentVideo({
        ...currentVideo,
        votes: { ...currentVideo.votes, "upVotes": currentUpvotes + 1 },
      });
      voteObj.vote = "upVote";
      voteObj.change = "increase";
      patchVideoVotes(voteObj);
      return
    } else if (newList && !newList.includes("upVote")) {
      if (currentUpvotes !== 0)
        setCurrentVideo({
          ...currentVideo,
          votes: { ...currentVideo.votes, "upVotes": currentUpvotes - 1 },
        });
      voteObj.vote = "upVote";
      voteObj.change = "decrease";
      patchVideoVotes(voteObj,id);
    }

    if (newList.includes("downVote") && value === "downVote") {
      setCurrentVideo({
        ...currentVideo,
        votes: { ...currentVideo.votes, "downVotes": currentDownvotes + 1 },
      });
      voteObj.vote = "downVote";
      voteObj.change = "increase";
      patchVideoVotes(voteObj,id);
    } else if (!newList.includes("downVote")) {
      if (currentDownvotes !== 0)
        setCurrentVideo({
          ...currentVideo,
          votes: { ...currentVideo.votes, "downVotes": currentDownvotes - 1 },
        });
      voteObj.vote = "downVote";
      voteObj.change = "decrease";
      patchVideoVotes(voteObj,id);
    }
  };

  const fetchVideoContent = async () => {
    try {
      let url = `${config.endpoint}/${id}`;
      let response = await fetch(url);
      if (!response.ok) {
        return;
      }
      let data = await response.json();
      setCurrentVideo(data);
      return
    } catch (error) {
      console.log(error)
    }
  };

  const updateVideoViews = async () => {
    try{
      let url = `${config.endpoint}/${id}/views`;
      let response = await fetch(url,{
        method: "PATCH",
      });
      if (!response.ok) {
        return;
      }
    }catch(error){
      console.log(error);
    }
  }

  const fetchVideos = async () => {
    try{
      let response = await fetch(`${config.endpoint}`);
      let data = await response.json();
      setVideosList(data.videos);
      return
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVideoContent()
    setActiveButtons([])
    fetchVideos()
    updateVideoViews();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <>
      <Header />
      <Box className="parent-content-box">
        {currentVideo ? (
          <Card raised={false} className="video-card iframe-parent">
            <CardMedia
              className="iframe-box"
              sx={{ border: 0 }}
              component="iframe"
              image={`https://www.${currentVideo.videoLink}`}
            />
            <CardContent className="video-details">
              <Box>
                <Typography gutterBottom variant="h6" component="div">
                  {currentVideo.title}
                </Typography>
                <Box>
                  <Typography className="subtitle" component="span">
                    {currentVideo.contentRating}
                  </Typography>
                  <Typography className="subtitle" component="span">
                    <CircleIcon
                      sx={{
                        width: "12px",
                        height: "5px",
                        mb: "2px",
                        mx: "3px",
                      }}
                      fontSize="small"
                    />
                  </Typography>
                  <Typography className="subtitle" component="span">
                    {currentVideo.releaseDate}
                  </Typography>
                </Box>
              </Box>

              <ToggleButtonGroup
                exclusive={false}
                className="button-group"
                value={activeButtons}
                onChange={handleActionButtons}
              >
                <ToggleButton
                  value="upVote"
                  size="small"
                  variant="outlined"
                  className="action-buttons"
                >
                  <ThumbUpIcon
                    value="upVote"
                    fontSize="small"
                    sx={{ width: "12px", height: "12px" }}
                  />
                  {currentVideo.votes.upVotes}
                </ToggleButton>
                <ToggleButton
                  value="downVote"
                  size="small"
                  variant="contained"
                  className="action-buttons"
                >
                  <ThumbDownIcon
                    fontSize="small"
                    sx={{ width: "12px", height: "12px" }}
                  />
                  {currentVideo.votes.downVotes}
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>
        ) : (
          <Box className="not-found-box">
            <HourglassTopOutlinedIcon fontSize="medium" color="primary" />
            <Typography color="primary">Loading Video</Typography>
          </Box>
        )}

        <hr className="line" />
        <Box sx={{display:"flex", justifyContent: "center"}}>
          <VideoGrid videoList={videosList} setReload/>
        </Box>
        
      </Box>
    </>
  );
};

export default VideoPage;
