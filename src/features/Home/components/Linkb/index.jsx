import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { linkb } from '../../../../constants/gobal'

function Linkb(props) {
    return (
        <div className="linkb">
            {
                linkb.map((item, index) => {
                    return <a><img src={item.src} alt="" key={index} />
                    </a>
                })
            }
        </div>
    )
}

Linkb.propTypes = {

}

export default Linkb

