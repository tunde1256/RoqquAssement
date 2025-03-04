import { Request, Response, NextFunction } from 'express';

export const validatePostId = (req: Request, res: Response, next: NextFunction): any => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      status: 'error',
      message: 'Post ID must be a valid number',
    });
  }

  next(); 
};
