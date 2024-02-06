import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.css'
import TopNewProduct from './components/TopNewProduct'
import MainNewProduct from './components/MainNewProduct'

function NewProduct(props) {

    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    return (
        <div className="newproduct">

            <TopNewProduct
                next={next}
                prev={prev}
            />
            <MainNewProduct
                setNext={setNext}
                setPrev={setPrev}
            />

        </div>
    )
}

NewProduct.propTypes = {

}

export default NewProduct

