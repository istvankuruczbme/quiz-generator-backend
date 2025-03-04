import { Router } from "express";
import validateUserDataMW from "../middlewares/user/validateUserDataMW";
import createCustomerMW from "../middlewares/user/createCustomerMW";
import createUserMW from "../middlewares/user/createUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import getUserIdFromRequestMW from "../middlewares/user/getUserIdFromRequestMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";
import checkExistingUserMW from "../middlewares/user/checkExistingUserMW";
import validateCategoriesDataMW from "../middlewares/category/validateCategoriesDataMW";
import getUserCategoriesMW from "../middlewares/userCategory/getUserCategoriesMW";
import updateUserCategoriesMW from "../middlewares/userCategory/updateUserCategoriesMW";
import sendUserUpdatedResponseMW from "../middlewares/user/sendUserUpdatedResponseMW";

const router = Router();

// Get user
router.get("/:userId", getUserIdFromRequestMW("PARAMS"), validateUserIdMW, getUserMW, returnUserMW);

// Create new user
router.post("/", validateUserDataMW, createCustomerMW, createUserMW, returnUserMW);

// Update user categories
router.put(
	"/:userId/categories",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	checkExistingUserMW,
	validateCategoriesDataMW,
	getUserCategoriesMW,
	updateUserCategoriesMW,
	sendUserUpdatedResponseMW
);

export { router as userRoute };
