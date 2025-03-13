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
import { imageUpload } from "../config/multer";
import validateUserPersonalDataMW from "../middlewares/user/validateUserPersonalDataMW";
import updateUserPersonalDataMW from "../middlewares/user/updateUserPersonalDataMW";
import uploadUserPhotoMW from "../middlewares/user/uploadUserPhotoMW";
import validateUserEmailMW from "../middlewares/user/validateUserEmailMW";
import updateUserEmailMW from "../middlewares/user/updateUserEmailMW";
import returnUserCategoriesMW from "../middlewares/userCategory/returnUserCategoriesMW";
import deleteUserMW from "../middlewares/user/deleteUserMW";
import deleteUserCategoriesMW from "../middlewares/userCategory/deleteUserCategoriesMW";
import deleteUserPhotoMW from "../middlewares/user/deleteUserPhotoMW";
import deleteCustomerMW from "../middlewares/user/deleteCustomerMW";
import sendUserDeletedResponseMW from "../middlewares/user/sendUserDeletedResponseMW";
import createCustomerPortalSessionMW from "../middlewares/user/createCustomerPortalSessionMW";
import returnCustomerPortalSessionUrlMW from "../middlewares/user/returnCustomerPortalSessionUrlMW";

const router = Router();

// Get user
router.get("/:userId", getUserIdFromRequestMW("PARAMS"), validateUserIdMW, getUserMW, returnUserMW);

// Get user categories
router.get(
	"/:userId/categories",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	checkExistingUserMW,
	getUserCategoriesMW,
	returnUserCategoriesMW
);

// Create new user
router.post("/", validateUserDataMW, createCustomerMW, createUserMW, returnUserMW);

// Create a session to customer portal
router.post(
	"/:userId/portal",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	createCustomerPortalSessionMW,
	returnCustomerPortalSessionUrlMW
);

// Update user email
router.put(
	"/:userId/email",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	checkExistingUserMW,
	validateUserEmailMW,
	updateUserEmailMW,
	sendUserUpdatedResponseMW
);

// Update user personal data
router.put(
	"/:userId/personal",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	imageUpload.single("file"),
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

// Delete user
router.delete(
	"/:userId",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	deleteUserMW,
	deleteUserPhotoMW,
	deleteUserCategoriesMW,
	deleteCustomerMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
