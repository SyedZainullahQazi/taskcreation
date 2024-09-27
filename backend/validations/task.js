import { check, validationResult } from 'express-validator';

// Middleware to validate task creation
export const validateCreateTask = [
  check('title')
    .notEmpty()
    .withMessage('Title is required.')
    .isString()
    .withMessage('Title must be a string.'),

  check('description')
    .notEmpty()
    .withMessage('Description is required.')
    .isString()
    .withMessage('Description must be a string.'),

  check('priority')
    .notEmpty()
    .withMessage('Priority is required.')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of: low, medium, high.'),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware to validate task update
export const validateUpdateTask = [
  check('title')
    .optional()
    .isString()
    .withMessage('Title must be a string.'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),

  check('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of: low, medium, high.'),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware to validate task status update
export const validateUpdateStatus = [
  check('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn(['pending', 'completed'])
    .withMessage("Status must be either 'pending' or 'completed'."),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware to validate task listing filters
export const validateTaskListing = [
  check('sortOrder')
    .optional()
    .isIn(['ascend', 'descend',null])
    .withMessage("Sort order must be either 'ascend' or 'descend'."),

  check('filters.priority')
    .optional()
    .isIn(['low', 'medium', 'high',null])
    .withMessage('Filter priority must be one of: low, medium, high.'),

  check('filters.status')
    .optional()
    .isIn(['pending', 'completed',null])
    .withMessage('Filter status must be one of: pending, completed.'),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
