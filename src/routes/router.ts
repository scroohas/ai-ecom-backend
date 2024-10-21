import { Router } from "express";
import userRouter from "./users.routes";
import authRouter from "./auth.routes";
import productRouter from "./products.routes";

const router = Router({ mergeParams: true });

router.use("/users", userRouter);
router.use("/users/auth", authRouter);
router.use("/products", productRouter);

export default router;
