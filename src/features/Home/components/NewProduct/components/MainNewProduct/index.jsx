import React from 'react'
import PropTypes from 'prop-types'

import { newProductImgLeft } from '../../../../../../constants/gobal'
import NewProductItems from './components/NewProductItems/index';

import './style.css'



function MainNewProduct(props) {

    const { setNext, setPrev } = props;
    return (
        <div className="mainnewproduct">
            <img src={newProductImgLeft} alt="" />
            <NewProductItems
                setNext={setNext}
                setPrev={setPrev}
            />
        </div>
    )
}

MainNewProduct.propTypes = {

}

export default MainNewProduct

