import express from "express";
import {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    userCredits,
    paymentRazorpay,
    verifyRazorpay
} from "../controllers/UserController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

userRouter.get('/credits', authUser, userCredits);
userRouter.post('/pay-razor', authUser, paymentRazorpay);
userRouter.post('/verify-razor', authUser, verifyRazorpay);

export default userRouter;
