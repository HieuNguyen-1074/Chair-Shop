import React from 'react'
import PropTypes from 'prop-types'

import "./style.css";
import { FastField, Formik } from 'formik';
import FileField from './../../custom-field/FileField/index';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';
import { Avatar, Card, CardContent, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: "translate(-50%,-50%)",
        padding: "2rem",
        // textAlign: "center"

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],

    },
    CardContent: {
        paddingLeft: "0px"
    }
}));

function UserInfor(props) {
    const { isOpenUser, handleUserInfor, setIsLogin } = props;

    const classes = useStyles();
    const handleLogout = () => {
        setIsLogin(false);
        window.open("/user", "_self");
        handleUserInfor(false);
    }

    return (

        <div className="user__infor"
            style={{
                display: isOpenUser ? '' : 'none',
                zIndex: "100"
            }}
        >

            <Card className={classes.root}>
                <div className="top"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}
                >
                    <Avatar
                        aria-label="recipe" className={classes.avatar}
                    >
                        H
                    </Avatar>
                    <FaTimes
                        onClick={() => handleUserInfor(false)}
                    />
                </div>

                <CardContent
                    className={classes.CardContent}
                >
                    <Typography variant="h6" color="textSecondary" component="h1"

                    >
                        Hieu Nguyen
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h1">
                        Email  : Hjeu1074@gmail.com
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h1"

                    >
                        Phone : 0964396570
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h1"

                    >
                        Address : khu 3 lm thao phu tho skj skhjd
                    </Typography>


                </CardContent>
                <Button variant="contained" color="primary" disableElevation
                    onClick={handleLogout}
                    style={{
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    Log out
                    <IoLogOutOutline
                        style={{
                            width: "30px",
                            height: '30px',
                            marginLeft: '4px'
                        }}
                    />
                </Button>
            </Card>
        </div>
    )
}

UserInfor.propTypes = {

}

export default UserInfor

