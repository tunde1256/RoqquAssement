"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletionSuccessResponse = exports.paginationResponse = exports.validationErrorResponse = exports.errorResponse = exports.successResponse = void 0;
// Success Response
const successResponse = (res, data, message = "Request was successful", statusCode = 200) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
    });
};
exports.successResponse = successResponse;
// Error Response
const errorResponse = (res, message = "An error occurred", statusCode = 500) => {
    return res.status(statusCode).json({
        status: "error",
        message,
    });
};
exports.errorResponse = errorResponse;
// Validation Error Response
const validationErrorResponse = (res, message = "Validation failed", errors = [], statusCode = 400) => {
    return res.status(statusCode).json({
        status: "error",
        message,
        errors,
    });
};
exports.validationErrorResponse = validationErrorResponse;
// Pagination Response
const paginationResponse = (res, data, page, pageSize, totalCount, message = "Data retrieved successfully") => {
    return res.status(200).json({
        status: "success",
        message,
        data,
        pagination: {
            page,
            pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        },
    });
};
exports.paginationResponse = paginationResponse;
const deletionSuccessResponse = (res, message = "Deleted successfully") => {
    return res.status(200).json({
        status: "success",
        message,
    });
};
exports.deletionSuccessResponse = deletionSuccessResponse;
