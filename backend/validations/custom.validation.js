const {genreList, contentRatingList} = require("../data/categoryList");

const objectId = (value,helpers) => {
    if(!value.match(/^[0-9a-fA-F]{24}$/)){
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value
}

// const genreList = ["Education", "Sports", "Movies", "Comedy", "Lifestyle"];
const checkValidCategory = (categories, categoryList) => {
    let valid = true;

    for(const category of categories){
        if(!categoryList.includes(category)){
            valid = false;
            break;
        }
    }

    return valid;
}

const validGenres = (value,helpers) => {
    let genres = value.split(",");
    let validGenre = checkValidCategory(genres,genreList);
    if(!validGenre){
        return helpers.message('"{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
    }

    return value;

}

const validRating = (value,helpers) => {
    let ratings = value.split(",");
    let validRating = checkValidCategory(ratings,contentRatingList);
    if(!validRating){
        return helpers.message('"{{#label}}" must be one of [“Anyone”, "7+", "12+", "16+", "18+"]');
    }

    return value;

}

module.exports = {objectId,validGenres,validRating}