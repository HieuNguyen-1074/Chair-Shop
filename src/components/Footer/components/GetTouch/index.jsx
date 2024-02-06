import React from 'react'
import PropTypes from 'prop-types'
import { logoLink, linkContact } from '../../../../constants/gobal'
import './style.css'
function GetTouch(props) {
    return (
        <div className="footer__gettouch">
            <h1>get in touch</h1>
            <div className="footer__gettouch-list">
                {
                    linkContact.map((item, index) => {
                        return <a href="">
                            <img src={item.src}
                                key={index}
                                alt="" />
                        </a>
                    })
                }
            </div>
        </div>
    )
}

GetTouch.propTypes = {

}

export default GetTouch

