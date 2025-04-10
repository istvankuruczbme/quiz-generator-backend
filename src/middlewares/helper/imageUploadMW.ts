import { imageUpload } from "../../config/multer";
import parseRequestBodyMW from "./parseRequestBodyMW";

// Array of MWs to handle image upload
const imageUploadMW = [imageUpload.single("file"), parseRequestBodyMW];

export default imageUploadMW;
