import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function FooterAbout(props) {
    return (
        <div className='footer__about'>
            <h1>about</h1>
            <div className="footer__about--list">
                <a href="">about us</a>
                <a href="">our offer</a>
                <a href="">office</a>
                <a href="">help & faq</a>
                
            </div>
        </div>
    )
}

FooterAbout.propTypes = {

}

export default FooterAbout

