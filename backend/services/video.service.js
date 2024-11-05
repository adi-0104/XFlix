const Video = require("../models/video.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

class videoServices {

    findVideos = async (queryObj) => {
        const result = await Video.find(queryObj);
        return result;
    }

    findVideo = async (videoId) => {
        const result = await Video.findById(videoId);
        return result;
    }

    createVideo = async (reqObj) => {
        const videoLink = reqObj.videoLink
        const isVideoPresent = await Video.isVideoPresent(videoLink)
        if(isVideoPresent){
            return null
        }
        const result  = await Video.create(reqObj);
        return result
    }

    changeVote = async (videoId,change,vote) => {
        let videoObj = await this.findVideo(videoId);

        if(!videoObj){
            throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id")
        }

        if(vote === "upVote"){
            if(change==="increase") videoObj.votes.upVotes += 1;
            else if(change === "decrease" && videoObj.votes.upVotes) videoObj.votes.upVotes -= 1; 
        }

        if(vote === "downVote"){
            if(change==="increase") videoObj.votes.downVotes += 1;
            else if(change === "decrease" && videoObj.votes.downVotes) videoObj.votes.downVotes -= 1; 
        }

        await videoObj.save();
        
    }

    addView = async (videoId) => {
        let videoObj = await this.findVideo(videoId);

        if(!videoObj){
            throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id")
        }

        videoObj.viewCount += 1;
        await videoObj.save()
    }

}

module.exports = videoServices
