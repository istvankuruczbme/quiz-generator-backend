import { Router } from "express";
import validateUserDataMW from "../middlewares/user/validateUserDataMW";
import createCustomerMW from "../middlewares/user/createCustomerMW";
import createUserMW from "../middlewares/user/createUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import getUserIdFromRequestMW from "../middlewares/user/getUserIdFromRequestMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";

const router = Router();

// Get user
router.get("/:userId", getUserIdFromRequestMW("PARAMS"), validateUserIdMW, getUserMW, returnUserMW);

// Create new user
router.post("/", validateUserDataMW, createCustomerMW, createUserMW, returnUserMW);

export { router as userRoute };
