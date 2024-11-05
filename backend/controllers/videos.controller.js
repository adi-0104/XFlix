
const videoServiceClass = require("../services/video.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const sortVideos = require("../utils/sortVideos");
const videoService = new videoServiceClass;

const getVideos = catchAsync(async (req,res) => {
    //check if query params present
    const {genres, title, contentRating, sortBy} = req.query;

    const queryObj = {
        ...(genres && genres !== "All" && {genre: genres.split(",")}),
        ...(contentRating && {contentRating}),
        ...(title && {title : {$regex: new RegExp(title),$options: "i"}})
    };
    let videos = await videoService.findVideos(queryObj);
    
    if(videos.length === 0){
        throw new ApiError(httpStatus.NOT_FOUND, "No videos in DB");
    }

    if(sortBy){
        videos = sortVideos(videos,sortBy);
    }
    
    res.json({videos: videos});
})

const getVideo = catchAsync(async (req,res) => {
    const {videoId} = req.params;
    const videoObj = await videoService.findVideo(videoId);
    if(!videoObj){
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }

    res.json(videoObj);
})

const postVideo = catchAsync(async (req,res) => {
    const videoObj = await videoService.createVideo(req.body);
    if(!videoObj){
        throw new ApiError(httpStatus.OK,"Video already present in DB");
    }

    res.status(httpStatus.CREATED).json(videoObj);
})

const updateVote = catchAsync(async (req,res) => {
    const {change,vote} = req.body;
    const {videoId} = req.params;
    await videoService.changeVote(videoId,change,vote);
    
    res.status(httpStatus.NO_CONTENT).send();
})

const updateViews = catchAsync(async (req,res) => {
    const {videoId} = req.params;
    
    await videoService.addView(videoId);
    res.status(httpStatus.NO_CONTENT).send(); 
})

module.exports = {
    getVideos,
    getVideo,
    postVideo,
    updateVote,
    updateViews
}