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
import validateAuthorizationHeaderMW from "../middlewares/auth/validateAuthorizationHeaderMW";
import getAuthTokenMW from "../middlewares/auth/getAuthTokenMW";
import getUserFromAuthMW from "../middlewares/auth/getUserFromAuthMW";
import validateAuthUserMW from "../middlewares/auth/validateAuthUserMW";
import deleteAuthUserMW from "../middlewares/auth/deleteAuthUserMW";

const router = Router();

// Get user
router.get(
	"/:userId",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	returnUserMW
);

// Get user subscription
router.get(
	"/:userId/subscription",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	getUserSubscriptionMW,
	returnSubscriptionMW
);

// Get user categories
router.get(
	"/:userId/categories",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	checkExistingUserMW,
	getUserCategoriesMW,
	returnUserCategoriesMW
);

// Create new user
router.post("/", validateUserDataMW, createCustomerMW, createUserMW, returnUserMW);

// Create a session to customer portal
router.post(
	"/:userId/portal",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	createCustomerPortalSessionMW,
	returnCustomerPortalSessionUrlMW
);

// Update user email
router.put(
	"/:userId/email",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	validateUserEmailMW,
	updateCustomerEmailMW,
	updateUserEmailMW,
	sendUserUpdatedResponseMW
);

// Update user personal data
router.put(
	"/:userId/personal",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
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
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	validateNewSubscriptionDataMW,
	getUserSubscriptionMW,
	updateSubscriptionPriceMW,
	sendSubscriptionUpdatedResponseMW
);

// Update user categories
router.put(
	"/:userId/categories",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	checkExistingUserMW,
	validateCategoriesDataMW,
	getUserCategoriesMW,
	updateUserCategoriesMW,
	sendUserUpdatedResponseMW
);

// Delete user
router.delete(
	"/:userId",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	getUserFromAuthMW,
	getUserIdFromRequestMW("PARAMS"),
	validateUserIdMW,
	validateAuthUserMW,
	getUserMW,
	deleteAuthUserMW,
	deleteCustomerMW,
	deleteUserMW,
	deleteUserPhotoMW,
	deleteUserCategoriesMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
