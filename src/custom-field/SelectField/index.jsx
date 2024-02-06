import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
function SelectField(props) {

    const { options, onChange } = props;
    return (
        <>
            <Select options={options}
                defaultValue={options[0]}
                onChange={e => onChange(e)}
                
            >


            </Select>
        </>
    )
}

SelectField.propTypes = {

}

export default SelectField

