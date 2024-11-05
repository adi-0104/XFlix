const pick = require("../utils/pick");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const joi = require("joi");

const validate = (schema) => (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
        return next(
        new ApiError(
            httpStatus.UNSUPPORTED_MEDIA_TYPE,
            "Supports JSON request body only"
        )
        );
    }

    const validSchema = pick(schema, ["body", "params", "query"]);

    const validRequest = pick(req, Object.keys(validSchema));

    const { value, error } = joi
        .compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(validRequest);

    // If validation fails throw 400 Bad Request error
    if (error) {
        const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Update validated fields in request with returned value
    Object.assign(req, value);

    return next();
};

module.exports = validate;
