import { Router } from "express";
import validateUserDataMW from "../middlewares/db/user/validateUserDataMW";
import createUserMW from "../middlewares/db/user/createUserMW";
import returnUserMW from "../middlewares/db/user/returnUserMW";
import getUserIdFromRequestMW from "../middlewares/db/user/getUserIdFromRequestMW";
import validateUserIdMW from "../middlewares/db/user/validateUserIdMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import checkExistingUserMW from "../middlewares/db/user/checkExistingUserMW";
import getUserCategoriesMW from "../middlewares/db/userCategory/getUserCategoriesMW";
import updateUserCategoriesMW from "../middlewares/db/userCategory/updateUserCategoriesMW";
import sendUserUpdatedResponseMW from "../middlewares/db/user/sendUserUpdatedResponseMW";
import { imageUpload } from "../config/multer";
import validateUserPersonalDataMW from "../middlewares/db/user/validateUserPersonalDataMW";
import updateUserPersonalDataMW from "../middlewares/db/user/updateUserPersonalDataMW";
import uploadUserPhotoMW from "../middlewares/db/user/uploadUserPhotoMW";
import validateUserEmailMW from "../middlewares/db/user/validateUserEmailMW";
import updateUserEmailMW from "../middlewares/db/user/updateUserEmailMW";
import returnUserCategoriesMW from "../middlewares/db/userCategory/returnUserCategoriesMW";
import deleteUserMW from "../middlewares/db/user/deleteUserMW";
import deleteUserCategoriesMW from "../middlewares/db/userCategory/deleteUserCategoriesMW";
import deleteUserPhotoMW from "../middlewares/db/user/deleteUserPhotoMW";
import sendUserDeletedResponseMW from "../middlewares/db/user/sendUserDeletedResponseMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import updateSubscriptionPriceMW from "../middlewares/stripe/subscription/updateSubscriptionPriceMW";
import returnSubscriptionMW from "../middlewares/stripe/subscription/returnSubscriptionMW";
import createCustomerMW from "../middlewares/stripe/customer/createCustomerMW";
import createCustomerPortalSessionMW from "../middlewares/stripe/customer/createCustomerPortalSessionMW";
import returnCustomerPortalSessionUrlMW from "../middlewares/stripe/customer/returnCustomerPortalSessionUrlMW";
import updateCustomerEmailMW from "../middlewares/stripe/customer/updateCustomerEmailMW";
import validateNewSubscriptionDataMW from "../middlewares/stripe/subscription/validateNewSubscriptionDataMW";
import sendSubscriptionUpdatedResponseMW from "../middlewares/stripe/subscription/sendSubscriptionUpdatedResponseMW";
import validateCategoriesDataMW from "../middlewares/db/category/validateCategoriesDataMW";
import deleteCustomerMW from "../middlewares/stripe/customer/deleteCustomerMW";
import updateCustomerNameMW from "../middlewares/stripe/customer/updateCustomerNameMW";

const router = Router();

// Get user
router.get("/:userId", getUserIdFromRequestMW("PARAMS"), validateUserIdMW, getUserMW, returnUserMW);

// Get user subscription
router.get(
	"/:userId/subscription",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	getUserSubscriptionMW,
	returnSubscriptionMW
);

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
	getUserMW,
	validateUserEmailMW,
	updateCustomerEmailMW,
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
	updateCustomerNameMW,
	uploadUserPhotoMW,
	updateUserPersonalDataMW,
	sendUserUpdatedResponseMW
);

// Update user subscription
router.put(
	"/:userId/subscription",
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	getUserMW,
	validateNewSubscriptionDataMW,
	getUserSubscriptionMW,
	updateSubscriptionPriceMW,
	sendSubscriptionUpdatedResponseMW
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
	deleteCustomerMW,
	deleteUserMW,
	deleteUserPhotoMW,
	deleteUserCategoriesMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
