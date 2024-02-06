import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { Formik } from 'formik'
import { FormGroup } from 'react-bootstrap'
import InputField from '../../../../custom-field/InputField'

function Subscribe(props) {
    return (
        <div className='subscribe'>

            <div className="container">
                <div className="subscribe__left">
                    <h1>Subscribe newsletter to get updated</h1>
                    <p>We are infrom you that if you give any discount </p>

                </div>
                <div className="subscribe__right">
                    <form>


                        <InputField
                            placeholder='Enter your email adress here'
                            name='subscribe'
                            type='text'
                        />
                        <button>subscribe</button>

                    </form>

                </div>
            </div>
        </div>
    )
}

Subscribe.propTypes = {

}

export default Subscribe

