import React from 'react'
import PropTypes from 'prop-types'

import { Input } from 'reactstrap';
import { TextField } from '@material-ui/core'
// import { classNames } from 'react-select/src/utils';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "unset !important",
        borderColor: '#ed6c63 !important'
    },
}));
function InputField(props) {
    const classes = useStyles();
    const { name, type, placeholder, label, value, onChange } = props
    console.log(value);
    return (
        <div>
            {(label ? <label for={name}>{label}</label> : '')}
            <Input type={type}
                className={classes.root}
                name={name}
                style={{ outline: "none !important" }}
                value={value}
                placeholder={placeholder} variant="outlined"
                onChange={e => onChange(e)}
            />



        </div>
    )
}

InputField.propTypes = {

}

export default InputField

