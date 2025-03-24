import getAuthTokenMW from "./getAuthTokenMW";
import getUserFromAuthMW from "./getUserFromAuthMW";
import validateAuthorizationHeaderMW from "./validateAuthorizationHeaderMW";

// Array of authentication middlewares
const authUserMW = [validateAuthorizationHeaderMW, getAuthTokenMW, getUserFromAuthMW];

export default authUserMW;
