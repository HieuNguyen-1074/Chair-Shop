import React from 'react'
import PropTypes from 'prop-types'
import LeftWrapper from './components/LeftWrapper'

import { Carousel } from 'react-slick'
import RightWrapper from './components/RightWrapper/index';
import './style.css'

function Wrapper(props) {
    return (
        <div className='wrapper'>
            <LeftWrapper />
            <RightWrapper />
        </div>
    )
}

Wrapper.propTypes = {

}

export default Wrapper

