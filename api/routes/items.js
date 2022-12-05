import { Router } from "express";
// Accounts model
import { Items } from "../../models/Items.js";


const router = Router();
// @route GET api/users
// @desc 

router.get('/', async (req, res) => {
    res.send(await Items.find( {"name": "Kale"} ))
});

export { router as itemsPath };