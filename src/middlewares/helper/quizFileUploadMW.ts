import { quizFileUpload } from "../../config/multer";
import parseRequestBodyMW from "./parseRequestBodyMW";

// Array of MWs to handle quiz file upload
const quizFileUploadMW = [quizFileUpload.single("file"), parseRequestBodyMW];

export default quizFileUploadMW;
