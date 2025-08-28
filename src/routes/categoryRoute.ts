import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import returnCategoriesMW from "../middlewares/db/category/returnCategoriesMW";
import getCategoriesMW from "../middlewares/db/category/getCategoriesMW";

const router = Router();

// Add authentication middlewares
router.use(authUserMW);

// Get categories
router.get("/", getCategoriesMW, returnCategoriesMW);

export { router as categoryRoute };
