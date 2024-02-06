import React from 'react'
import PropTypes from 'prop-types'
import InputField from './../../../../../../custom-field/InputField/index';

function ManageAdminLeft(props) {
    return (
        <>
            <div className="form-admin-left">

                <div className="namelogin">
                    {/* <p
                        style={{
                            margin: '0',
                            marginBottom: '.4rem'
                        }}
                    >Name Login : </p>
                    <span>HIEUNGUYEN</span> */}
                </div>
                <div className="email">
                    {/* <p>email : </p> */}
                    <InputField
                        label='Email : '
                    />
                </div>
                <div className="namelogin">
                    <InputField
                        label='Address : '
                    />
                </div>
                <div className="namelogin">
                    <InputField
                        label='Phone: '
                    />
                </div>

            </div>
            <div className="form-admin-right">

            </div>
        </>
    )
}

ManageAdminLeft.propTypes = {

}

export default ManageAdminLeft

