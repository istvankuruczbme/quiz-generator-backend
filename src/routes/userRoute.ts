import { Router } from "express";
import validateUserDataMW from "../middlewares/db/user/validateUserDataMW";
import createUserMW from "../middlewares/db/user/createUserMW";
import returnUserProfileMW from "../middlewares/db/user/returnUserProfileMW";
import getUserMW from "../middlewares/db/user/getUserMW";
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
import deleteAuthUserMW from "../middlewares/auth/deleteAuthUserMW";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserProfileMW from "../middlewares/db/user/getUserProfileMW";
import removeUserPhotoUrlMW from "../middlewares/db/user/removeUserPhotoUrlMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get user
router.get("/:userId", getUserMW, getUserProfileMW, returnUserProfileMW);

// Get user subscription
router.get("/:userId/subscription", getUserMW, getUserSubscriptionMW, returnSubscriptionMW);

// Get user categories
router.get("/:userId/categories", getUserMW, getUserCategoriesMW, returnUserCategoriesMW);

// Create new user
router.post(
	"/",
	validateUserDataMW,
	createCustomerMW,
	createUserMW,
	getUserProfileMW,
	returnUserProfileMW
);

// Create a session to customer portal
router.post(
	"/:userId/portal",
	getUserMW,
	createCustomerPortalSessionMW,
	returnCustomerPortalSessionUrlMW
);

// Update user email
router.put(
	"/:userId/email",
	getUserMW,
	validateUserEmailMW,
	updateCustomerEmailMW,
	updateUserEmailMW,
	sendUserUpdatedResponseMW
);

// Update user personal data
router.put(
	"/:userId/personal",
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
	getUserMW,
	validateNewSubscriptionDataMW,
	getUserSubscriptionMW,
	updateSubscriptionPriceMW,
	sendSubscriptionUpdatedResponseMW
);

// Update user categories
router.put(
	"/:userId/categories",
	getUserMW,
	validateCategoriesDataMW,
	getUserCategoriesMW,
	updateUserCategoriesMW,
	sendUserUpdatedResponseMW
);

// Delete user photo
router.delete(
	"/:userId/photo",
	getUserMW,
	deleteUserPhotoMW,
	removeUserPhotoUrlMW,
	sendUserUpdatedResponseMW
);

// Delete user
router.delete(
	"/:userId",
	getUserMW,
	deleteAuthUserMW,
	deleteCustomerMW,
	deleteUserMW,
	deleteUserCategoriesMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
