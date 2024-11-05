const joi = require("joi");
const {objectId, validRating, validGenres} = require("./custom.validation");


//use object.without on query if sortby not to be applied on filtered objects - .without("sortBy",["genres","contentRating","title"])
const categorySchema = {
    query: joi.object().keys({
        title: joi.string(),
        genres: joi.string().custom(validGenres),
        // Joi.stringArray().items(Joi.string().valid(...Values.genres, "All")),
        contentRating: joi.string().custom(validRating),
        sortBy: joi.string().valid("viewCount","releaseDate")
    }),
}

const videoIdSchema = {
    params: joi.object().keys({
        videoId: joi.string().custom(objectId)
    }),
}

const videoSchema = {
    body: joi.object().keys({
        videoLink: joi.string().uri({allowRelative: true}).required(),
        title: joi.string().required(),
        genre: joi.string().custom(validGenres).required(),
        contentRating: joi.string().custom(validRating).required(),
        releaseDate: joi.string().required(),
        previewImage: joi.string().uri().required()
    })
}

const updateVoteSchema = {
    params: joi.object().keys({
        videoId: joi.string().custom(objectId)
    }),
    body: joi.object().keys({
        vote: joi.string().valid("upVote","downVote").required(),
        change: joi.string().valid("increase","decrease").required() 
    })
}



module.exports = {categorySchema,videoIdSchema,videoSchema, updateVoteSchema}