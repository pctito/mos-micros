import { Router } from 'express'

const router = Router();

router.get("/", async (req, res) => {
        res.send("Root endpoint")
});

export { router as rootPath };