import { Router } from "express";
import { 
    getAllUsers,
    updateUser,
    createUser,
    deleteUser
} from "../../controllers/usersController.js";


const router = Router();

// @route GET api/users
router.route('/')
    .get(getAllUsers)
    .post(updateUser)
    .put(createUser)
    .delete(deleteUser)

export { router as usersPath };