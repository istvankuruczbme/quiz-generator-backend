import { Router } from "express";
import getUserIdFromRequestMW from "../middlewares/db/user/getUserIdFromRequestMW";
import validateUserIdMW from "../middlewares/db/user/validateUserIdMW";
import checkExistingUserMW from "../middlewares/db/user/checkExistingUserMW";
import getAllCategoriesMW from "../middlewares/db/category/getAllCategoriesMW";
import returnCategoriesMW from "../middlewares/db/category/returnCategoriesMW";

const router = Router();

router.get(
	"/",
	getUserIdFromRequestMW("QUERY"),
	validateUserIdMW,
	checkExistingUserMW,
	getAllCategoriesMW,
	returnCategoriesMW
);

export { router as categoryRoute };
