import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const { generateImage } = useContext(AppContext);

  const onSumitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSumitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center">
      <div>
        <div className="relative">
          <img
            src={image}
            alt=""
            className="max-w-sm rounded border border-yellow-500"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-yellow-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'
              }`}
          />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-transparent border border-yellow-500 text-white text-sm mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-red-500 px-10 sm:px-16 py-3 rounded-full">
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex flex-wrap gap-2 justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-yellow-500 text-white px-8 py-3 rounded-full cursor-pointer">
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer flex items-center justify-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {isHovered ? (
              <FontAwesomeIcon icon={faDownload} style={{ color: '#ffffff' }} />
            ) : (
              'Download'
            )}
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
