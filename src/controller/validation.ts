import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 must be string"),
  body("country").isString().notEmpty().withMessage("country must be string"),
  body("city").isString().notEmpty().withMessage("city must be string"),
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("restaurantName must be string"),
  body("city").notEmpty().withMessage("city must be string"),
  body("country").notEmpty().withMessage("country must be string"),
  body("deliveryPrice").notEmpty().withMessage("deliveryPrice must be string"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("estimatedDeliveryTime must be postive Integer"),
  body("cuisines")
    .isArray()
    .withMessage("cuisines must be an Array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Items name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Items price is required and must be a postive number"),
  handleValidationErrors,
];

