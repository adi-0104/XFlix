const router = require("express").Router();
const {categorySchema, videoIdSchema, videoSchema, updateVoteSchema} = require("../validations/videos.validation");
const videoController = require("../controllers/videos.controller");
const validate = require("../middlewares/validate");

//get requests
router.get("/videos",validate(categorySchema),videoController.getVideos);
router.get("/videos/:videoId",validate(videoIdSchema),videoController.getVideo);

//post requests
router.post("/videos",validate(videoSchema),videoController.postVideo);

//patch requests
router.patch("/videos/:videoId/votes",validate(updateVoteSchema),videoController.updateVote);
router.patch("/videos/:videoId/views",validate(videoIdSchema),videoController.updateViews);

module.exports = router;
