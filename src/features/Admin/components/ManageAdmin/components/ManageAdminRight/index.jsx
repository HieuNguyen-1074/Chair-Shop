import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logoAdmin from '../../../../../../assets/images/usercp.png'


const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #0000',
        '& > *': {
            margin: theme.spacing(1),

        },
        '& > div': {
            border: "1px solid #0000",
            margin: '0 auto'

        }

    },
    input: {
        display: 'none',
        marginTop: '2rem'
    },
}));


function ManageAdminRight(props) {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}  >

                <div className='avatar-admin'
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <img
                        src={logoAdmin} alt="" />
                </div>
                <div className="buttonupload">
                    <input
                        accept=""
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => console.log(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload
        </Button>
                    </label>

                </div>
            </div>

        </>
    )
}

ManageAdminRight.propTypes = {

}

export default ManageAdminRight

