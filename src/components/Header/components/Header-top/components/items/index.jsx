import React from 'react'
import { Col } from 'react-bootstrap'

import './style.css'

export default function ItemTopHeader(props) {
    const { src, content } = props
    return (
        <div className="header__top--left-item">
            <img src={src} alt="" />
            <p>{content}</p>
        </div>
    )
}
