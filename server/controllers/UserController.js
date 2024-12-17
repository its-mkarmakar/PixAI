import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import razorpay from "razorpay";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ success: true, token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ success: true, token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const resetTokenExpiry = Date.now() + 3600000;

        user.resetToken = hashedToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p><p>If you did not request this, please ignore this email.</p>`,
        });

        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;

        if (!email || !token || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.resetToken) {
            return res.status(400).json({ success: false, message: "No reset token found" });
        }

        const isTokenValid = await bcrypt.compare(token, user.resetToken);
        if (!isTokenValid || Date.now() > user.resetTokenExpiry) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const userCredits = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, credits: user.creditBalance, user: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;

        if (!userId || !planId) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        const plans = {
            Basic: { credits: 100, amount: 10 },
            Advanced: { credits: 500, amount: 50 },
            Business: { credits: 1000, amount: 100 },
        };

        if (!plans[planId]) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        const { credits, amount } = plans[planId];
        const transaction = await transactionModel.create({
            userId,
            plan: planId,
            credits,
            amount,
            date: Date.now(),
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: transaction._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (!orderInfo || orderInfo.status !== "paid") {
            return res.status(400).json({ success: false, message: "Payment failed or incomplete" });
        }

        const transaction = await transactionModel.findById(orderInfo.receipt);
        if (!transaction || transaction.payment) {
            return res.status(400).json({ success: false, message: "Payment already verified" });
        }

        const user = await userModel.findById(transaction.userId);
        user.creditBalance += transaction.credits;
        await user.save();

        transaction.payment = true;
        await transaction.save();

        res.status(200).json({ success: true, message: "Credits added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    userCredits,
    paymentRazorpay,
    verifyRazorpay,
};
