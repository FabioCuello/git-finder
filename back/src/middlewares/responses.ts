import { NextFunction, Response, Request } from 'express';

export const customResponses = (_: Request, res: Response, next: NextFunction) => {
  res.success = (data = null) =>
    res.status(200).json({
      success: true,
      data
    });

  res.wrong = (error: string) =>
    res.status(400).json({
      success: false,
      code: 'VALIDATION_FAILURE',
      error: 'Validation error',
      data: error
    });

  res.forbidden = () =>
    res.status(401).json({
      success: false,
      code: 'NOT_AUTHENTICATED',
      error: 'Not authenticated'
    });

  res.accessDenied = () =>
    res.status(401).json({
      success: false,
      code: 'ACCESS_DENIED',
      error: 'Access denied'
    });

  res.customAccessDenied = (error: string) =>
    res.status(401).json({
      success: false,
      code: 'ACCESS_DENIED',
      error: error
    });

  res.internal = () =>
    res.status(500).json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal server error'
    });

  res.notFound = () =>
    res.status(404).json({
      success: false,
      code: 'NOT_FOUND',
      error: 'Not found'
    });

  return next();
};
