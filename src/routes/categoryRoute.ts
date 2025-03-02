import { Router } from "express";
import getUserIdFromRequestMW from "../middlewares/user/getUserIdFromRequestMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import checkExistingUserMW from "../middlewares/user/checkExistingUserMW";
import getAllCategoriesMW from "../middlewares/category/getAllCategoriesMW";
import returnCategoriesMW from "../middlewares/category/returnCategoriesMW";

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
