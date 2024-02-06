import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navbarLink } from '../../../../constants/gobal'

import './style.css'
import { FaList, FaTimes } from 'react-icons/fa';


function Navbar(props) {

    const [isNavbar, setIsNavbar] = useState(false)
    let navbar = [];
    for (const key in navbarLink) {
        navbar.push(navbarLink[key])
    }


    const handleNavbar = () => {
        setIsNavbar(!isNavbar)
    }




    return (
        <div className={isNavbar ? 'navbar navbar-active' : "navbar "}

        >
            <div className="navbar-top">
                {
                    isNavbar ? <FaTimes className='navbar-top-icon'
                        onClick={handleNavbar} />
                        :
                        <FaList className='navbar-top-icon'
                            onClick={handleNavbar} />
                }


            </div>

            <ul>
                {
                    navbar.map((link, index) => {

                        return <li key={index}>
                            <a href={link.src}>
                                {link.title}
                            </a>
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar

