import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams] = useSearchParams();

    const razorpayOrderId = searchParams.get("razorpay_order_id");
    const razorpayPaymentId = searchParams.get("razorpay_payment_id");
    const razorpaySignature = searchParams.get("razorpay_signature");

    const navigate = useNavigate();

    const verifyRazorpay = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.BACKEND_URL}/api/user/verify-razorpay`,
                { razorpayOrderId, razorpayPaymentId, razorpaySignature },
                { headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } }
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        if (process.env.REACT_APP_TOKEN) {
            verifyRazorpay();
        }
    }, []);

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;
