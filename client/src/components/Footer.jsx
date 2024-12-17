import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div id="footer" className='flex items-center justify-between gap-4 py-3 mt-20'>

      <Link to='/'><img src={assets.logo_icon} alt="logo" width={25} /></Link>

      <p className='flex-1 border-l border-gray-500 text-gray-500 pl-4 text-sm max-sm:hidden'>
        Copyright @ PixAI | All rights reserved.
      </p>

      <div className='flex gap-2.5 cursor-pointer'>
        <FontAwesomeIcon icon={faFacebook} style={{ color: "#b9b9b9" }} />
        <FontAwesomeIcon icon={faInstagram} style={{ color: "#b9b9b9" }} />
        <FontAwesomeIcon icon={faTwitter} style={{ color: "#b9b9b9" }} />
      </div>

    </div>
  );
};

export default Footer;