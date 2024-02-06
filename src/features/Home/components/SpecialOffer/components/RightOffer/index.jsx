import React from 'react'
import PropTypes from 'prop-types'
import { offerImg } from '../../../../../../constants/gobal'
import './style.css'

function RightOffer(props) {
    return (
        <div className="offer__right">
            <img src={offerImg} alt="" />
        </div>
    )
}

RightOffer.propTypes = {

}

export default RightOffer

