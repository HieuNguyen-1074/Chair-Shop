import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function FooterServices(props) {
    return (
        <div className='footer__services'>
            <h1>services</h1>
            <div className="footer__services--list">
                <a href="">about us</a>
                <a href="">our offer</a>
                <a href="">office</a>
                <a href="">help & faq</a>
            </div>
        </div>
    )
}

FooterServices.propTypes = {

}

export default FooterServices

