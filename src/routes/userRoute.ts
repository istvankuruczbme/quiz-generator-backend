import { Router } from "express";
import returnUserProfileMW from "../middlewares/db/user/returnUserProfileMW";
import getUserMW from "../middlewares/db/user/getUserMW";
import getUserCategoriesMW from "../middlewares/db/userCategory/getUserCategoriesMW";
import updateUserCategoriesMW from "../middlewares/db/userCategory/updateUserCategoriesMW";
import validateUpdateUserDataMW from "../middlewares/db/user/validateUpdateUserDataMW";
import updateUserMW from "../middlewares/db/user/updateUserMW";
import uploadUserPhotoMW from "../middlewares/db/user/uploadUserPhotoMW";
import returnUserCategoriesMW from "../middlewares/db/userCategory/returnUserCategoriesMW";
import deleteUserMW from "../middlewares/db/user/deleteUserMW";
import deleteUserCategoriesMW from "../middlewares/db/userCategory/deleteUserCategoriesMW";
import deleteUserPhotoMW from "../middlewares/db/user/deleteUserPhotoMW";
import sendUserDeletedResponseMW from "../middlewares/db/user/sendUserDeletedResponseMW";
import getUserSubscriptionMW from "../middlewares/db/user/getUserSubscriptionMW";
import updateSubscriptionPriceMW from "../middlewares/stripe/subscription/updateSubscriptionPriceMW";
import returnSubscriptionMW from "../middlewares/stripe/subscription/returnSubscriptionMW";
import createCustomerPortalSessionMW from "../middlewares/stripe/customer/createCustomerPortalSessionMW";
import returnCustomerPortalSessionUrlMW from "../middlewares/stripe/customer/returnCustomerPortalSessionUrlMW";
import validateNewSubscriptionDataMW from "../middlewares/stripe/subscription/validateNewSubscriptionDataMW";
import sendSubscriptionUpdatedResponseMW from "../middlewares/stripe/subscription/sendSubscriptionUpdatedResponseMW";
import validateUpdateUserCategoriesDataMW from "../middlewares/db/userCategory/validateUpdateUserCategoriesDataMW";
import deleteCustomerMW from "../middlewares/stripe/customer/deleteCustomerMW";
import updateCustomerNameMW from "../middlewares/stripe/customer/updateCustomerNameMW";
import deleteAuthUserMW from "../middlewares/auth/deleteAuthUserMW";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserProfileMW from "../middlewares/db/user/getUserProfileMW";
import imageUploadMW from "../middlewares/helper/imageUploadMW";
import getCategoriesMW from "../middlewares/db/category/getCategoriesMW";
import getUserCompletionsMW from "../middlewares/db/completion/getUserCompletionsMW";
import returnCompletionsMW from "../middlewares/db/completion/returnCompletionsMW";
import createUserCategoriesEmbeddingMW from "../middlewares/db/userCategory/createUserCategoriesEmbeddingMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get user
router.get("/:userId", getUserMW, getUserProfileMW, returnUserProfileMW);

// Get user subscription
router.get("/:userId/subscription", getUserMW, getUserSubscriptionMW, returnSubscriptionMW);

// Get user categories
router.get("/:userId/categories", getUserMW, getUserCategoriesMW, returnUserCategoriesMW);

// Get user completions
router.get("/:userId/completions", getUserMW, getUserCompletionsMW, returnCompletionsMW);

// Create a session to customer portal
router.post(
	"/:userId/portal",
	getUserMW,
	createCustomerPortalSessionMW,
	returnCustomerPortalSessionUrlMW
);

// Update user personal data
router.put(
	"/:userId/personal",
	getUserMW,
	imageUploadMW,
	validateUpdateUserDataMW,
	updateCustomerNameMW,
	uploadUserPhotoMW,
	updateUserMW,
	getUserProfileMW,
	returnUserProfileMW
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
	validateUpdateUserCategoriesDataMW,
	getCategoriesMW,
	getUserCategoriesMW,
	updateUserCategoriesMW,
	createUserCategoriesEmbeddingMW,
	returnUserCategoriesMW
);

// Delete user
router.delete(
	"/:userId",
	getUserMW,
	deleteAuthUserMW,
	deleteCustomerMW,
	deleteUserCategoriesMW,
	deleteUserPhotoMW,
	deleteUserMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
