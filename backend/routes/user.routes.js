import {Router} from "express";
import { register,login, updateUserProfile, getAllUserProfile, download_profile, sendConnectionRequest, getMyConnectionsRequests, whatAreMyConnections, acceptRequest } from "../controllers/user.controller.js";
import { uploadProfilePicture } from "../controllers/user.controller.js";
// import { updateUserProfile } from "../controllers/user.controller.js";
import { getUserAndProfile } from "../controllers/user.controller.js";
import { updateProfileData } from "../controllers/user.controller.js";
import multer from "multer";
const router = Router();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,res,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})
router.route("/update_profile_picture").post(upload.single('profile_picture'),uploadProfilePicture)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user_update').post(updateUserProfile)
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").get(updateProfileData);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume").get(download_profile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/getConnectionRequests").get(getMyConnectionsRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptRequest);


export default router;