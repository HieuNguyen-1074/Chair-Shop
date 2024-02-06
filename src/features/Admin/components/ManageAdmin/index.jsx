import React from 'react'
import PropTypes from 'prop-types'
import Admin from './../../index';
import InputField from '../../../../custom-field/InputField';
import './style.css'
import ManageAdminLeft from './components/ManageAdminLeft/index';
import ManageAdminRight from './components/ManageAdminRight/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Receipt from '../../../../components/Receipt';

const useStyles = makeStyles((theme) => ({
    button: {
        background: '#ed6c63',
        color: '#ffff',
        marginTop: '2rem',
        padding: '.5rem 3rem',

    },
}));


function ManageAdmin(props) {
    const classes = useStyles()
    return (
        <div>
            <form className='form-admin' >
                <ManageAdminRight />
                <ManageAdminLeft />

                <Button

                    variant="contained" className={classes.button} disableElevation>
                    save
                </Button>
                
            </form>
        </div>
    )
}

ManageAdmin.propTypes = {

}

export default ManageAdmin

