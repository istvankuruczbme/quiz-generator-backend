import { Router } from "express";
import getAllCategoriesMW from "../middlewares/db/category/getAllCategoriesMW";
import returnCategoriesMW from "../middlewares/db/category/returnCategoriesMW";
import validateAuthorizationHeaderMW from "../middlewares/auth/validateAuthorizationHeaderMW";
import getAuthTokenMW from "../middlewares/auth/getAuthTokenMW";
import checkExistingUserFromAuthMW from "../middlewares/auth/checkExistingUserFromAuthMW";

const router = Router();

router.get(
	"/",
	validateAuthorizationHeaderMW,
	getAuthTokenMW,
	checkExistingUserFromAuthMW,
	getAllCategoriesMW,
	returnCategoriesMW
);

export { router as categoryRoute };
