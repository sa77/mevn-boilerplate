import { Router } from "express";
import userRouter from "./users/user.routes"

let router = Router();

router.use('/users', userRouter);

export = router
