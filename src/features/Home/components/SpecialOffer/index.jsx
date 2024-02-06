import React from 'react'
import PropTypes from 'prop-types'
import RightOffer from './components/RightOffer'
import LeftOffer from './components/LeftOffer'

import './style.css'


function SpecialOffer(props) {
    return (
        <div className="offer">
     
            <LeftOffer />
            <RightOffer />

        </div>
    )
}

SpecialOffer.propTypes = {

}

export default SpecialOffer

