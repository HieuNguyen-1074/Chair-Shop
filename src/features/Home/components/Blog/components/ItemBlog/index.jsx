import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

function ItemBlog(props) {

    const { src, id, content, author, date } = props;
    return (
        <div className="blog__item">
            <img src={src} alt="" />
            <h1>{content}</h1>

            <div className="blog__item--infor">
                <h1>{author}</h1>
                <p>{date}</p>
            </div>

        </div>
    )
}

ItemBlog.propTypes = {

}

export default ItemBlog

