import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function FooterInfor(props) {
    return (
        <div className='footer__information'>
            <h1>infor</h1>
            <div className="footer__information--list">
                <a href="">about us</a>
                <a href="">our offer</a>
                <a href="">office</a>
                <a href="">help & faq</a>
            </div>
        </div>
    )
}

FooterInfor.propTypes = {

}

export default FooterInfor

