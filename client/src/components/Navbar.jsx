import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const { setShowLogin, user, credit, logout } = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div id="navbar" className='flex items-center justify-between py-4'>

            <Link to='/'>
                <img src={assets.logo} alt="logo" className='h-12' />
            </Link>

            <div>
                {
                    user
                        ? <div className='flex items-center gap-2 sm:gap-3'>
                            <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-yellow-500 px-6 sm:px-6 py-2 sm:py-3 rounded hover:bg-yellow-600 transition-all duration-700'>
                                <p className="text-xs sm:text-sm font-md text-neutral-900">
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "#1f1e2c" }} className="mr-2 " /> Credit left : {credit}
                                </p>
                            </button>
                            <p className='text-white max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative group cursor-pointer'>
                                <FontAwesomeIcon icon={faUser} className="w-10" style={{ color: '#ffffff' }} />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-3 text-neutral-900 flex items-center gap-2'>
                                            Logout
                                            <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#000000" }} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex items-center gap-2 sm:gap-5'>
                            <p onClick={() => navigate('/buy')} className='cursor-pointer py-2 px-6 rounded border border-yellow-500'>Plans</p>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="bg-gradient-to-r from-yellow-500 to-orange-400 border border-yellow-500 text-neutral-900 py-2 px-6 rounded transition-all duration-300 hover:from-orange-400 hover:to-yellow-600">
                                Join
                            </button>

                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar