const mongoose = require("mongoose");
const validator = require("validator");

const videoSchema = mongoose.Schema(
    {
        videoLink: {
            type: String,
            required: true,
            unique: true,
            validate: (url) => validator.isURL(url)
        },
        title: {
            type: String,
            required: true
        },
        contentRating: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        releaseDate: {
            type: String,
            required: true
        },
        previewImage: {
            type: String,
            required: true,
            validate: (url) => validator.isURL(url)
        },
        viewCount: {
            type: Number,
            default: 0
        },
        votes: {
            upVotes: {
                type: Number,
                default: 0
            },
            downVotes: {
                type: Number,
                default: 0
            }
        }

    },
);

videoSchema.statics.isVideoPresent = async function(videoLink){
    let result = await this.findOne({videoLink: videoLink});
    return !!result;
}

const Video = mongoose.model("Video",videoSchema);

module.exports = Video;
