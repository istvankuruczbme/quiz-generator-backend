import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAllCategoriesMW from "../middlewares/db/category/getAllCategoriesMW";
import returnCategoriesMW from "../middlewares/db/category/returnCategoriesMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get categories
router.get("/", getAllCategoriesMW, returnCategoriesMW);

export { router as categoryRoute };
