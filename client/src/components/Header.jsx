import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-20'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border-2 border-yellow-500'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}>
                <p>Best text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10'>
                Your <span className='bg-gradient-to-r from-yellow-500 to-white bg-clip-text text-transparent'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 2 }}
                >imagination</span>, make visible.
            </motion.h1>

            <motion.p className='text-center text-neutral-400 max-w-xl mx-auto mt-5 text-sm'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}>
                A platform for creators. With our generative AI tools, you can easily turn your ideas into eye-catching visuals - Just type, and watch the magic happen.
            </motion.p>

            <motion.button
                onClick={onClickHandler}
                className="sm:text-lg text-white bg-transparent border border-yellow-500 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded shadow-lg hover:shadow-yellow-500/50 transition-shadow"
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.25 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}>
                Generate Images
                <img className="h-6" src={assets.star_group} alt="" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className='flex flex-wrap justify-center mt-16 gap-3'>
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_1}
                    alt="Sample 1"
                    width={70}
                />
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_2}
                    alt="Sample 2"
                    width={70}
                />
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_3}
                    alt="Sample 3"
                    width={70}
                />
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_4}
                    alt="Sample 4"
                    width={70}
                />
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_5}
                    alt="Sample 5"
                    width={70}
                />
                <motion.img
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                    className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                    src={assets.sample_img_6}
                    alt="Sample 6"
                    width={70}
                />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className='mt-2 text-neutral-600'>Generated images from PixAI</motion.p>
        </motion.div>
    )
}

export default Header