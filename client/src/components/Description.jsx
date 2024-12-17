import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Title = ({ text, subText }) => (
    <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">{text}</h1>
        <p className="text-gray-500">{subText}</p>
    </div>
);

const ImageSection = ({ imgSrc, altText }) => (
    <img
        src={imgSrc}
        className="w-80 xl:w-96 rounded-lg shadow-lg border border-yellow-500"
        alt={altText}
    />
);

const DescriptionText = ({ heading, paragraphs }) => (
    <div>
        <h2 className="text-3xl font-medium max-w-lg mb-4">{heading}</h2>
        {paragraphs.map((text, index) => (
            <p key={index} className="text-gray-600 mb-4 last:mb-0">
                {text}
            </p>
        ))}
    </div>
);

const Description = () => {
    const heading = 'Introducing the AI-Powered Text to Image Generator';
    const paragraphs = [
        'Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.',
        'Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don\'t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!',
    ];

    return (
        <motion.div
            className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <Title text="Create AI Images" subText="Turn your imagination into visuals" />
            <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
                <ImageSection imgSrc={assets.sample_img_1} altText="Sample AI generated image" />
                <DescriptionText heading={heading} paragraphs={paragraphs} />
            </div>
        </motion.div>
    );
};

export default Description;
