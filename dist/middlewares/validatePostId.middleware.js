"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostId = void 0;
const validatePostId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            status: 'error',
            message: 'Post ID must be a valid number',
        });
    }
    next();
};
exports.validatePostId = validatePostId;
