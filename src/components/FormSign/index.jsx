import React from 'react'
import PropTypes from 'prop-types'
import { FastField, Formik } from 'formik'
import InputField from './../../custom-field/InputField/index';

import './style.css'

function FormSign(props) {

    const { changePosition, formPosition } = props;

    return (
        <div className={formPosition ===
            "sign" ?
            "active" :
            ''}>
            <h1>Sign up</h1>
            <Formik >

                <form action="" className="formsignup">

                    <FastField
                        component={InputField}
                        label="user name new"
                        name="usernamenew"
                    />
                    <FastField
                        component={InputField}
                        label="password new"
                        name="password new"
                    />
                    <FastField
                        component={InputField}
                        label="password new check"
                        name="passwordnewcheck"
                    />
                    <div className="formsignup__bottom">
                        <button>sign up</button>
                        <h1>or </h1>
                        <p onClick={(e) => changePosition('login', e)}>sign in</p>
                    </div>
                </form>

            </Formik>
        </div>
    )
}

FormSign.propTypes = {

}

export default FormSign

