import React from 'react'
import PropTypes from 'prop-types'

function FileField(props) {
    const { type, name, label } = props;


    return (
        <div>
            <input
                type={type}
                name={name}
                label={label}
            />
        </div>
    )
}

FileField.propTypes = {

}

export default FileField

