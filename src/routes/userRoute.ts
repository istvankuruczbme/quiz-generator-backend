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
import upload from "../config/multer";
import validateUserPersonalDataMW from "../middlewares/user/validateUserPersonalDataMW";
import updateUserPersonalDataMW from "../middlewares/user/updateUserPersonalDataMW";
import uploadUserPhotoMW from "../middlewares/user/uploadUserPhotoMW";

const router = Router();

// Get user
router.get("/:userId", getUserIdFromRequestMW("PARAMS"), validateUserIdMW, getUserMW, returnUserMW);

// Create new user
router.post("/", validateUserDataMW, createCustomerMW, createUserMW, returnUserMW);

// Update user personal data
router.put(
	"/:userId/personal",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	upload.single("file"),
	validateUserPersonalDataMW,
	uploadUserPhotoMW,
	updateUserPersonalDataMW,
	sendUserUpdatedResponseMW
);

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
