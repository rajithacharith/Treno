import React, {Component,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/MailOutline';
import PasswodrdlinedIcon from '@material-ui/icons/Https';
import {makeStyles} from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import Input from '@material-ui/core/Input';
import DefaultImg from '../assets/default-img.png';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Fab from '@material-ui/core/Fab';
import { withRouter } from 'react-router';
import axios from 'axios';
import { createBrowserHistory } from "history";
import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/search/collections)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    responsive : {
        width: '100%' ,
        maxWidth : '1000px',
        height: '100%',
        objectFit: 'cover',
    },
    imageCropper : {
        width : '50vmin',
        height : '50vmin',
        position : 'relative',
        overflow : 'hidden',
        borderRadius : '50%',
        padding : '0vmin'
    },
    inputImage : {
        width : '1vmin',
        height : '1vmin',
        zIndex : 1,
        position : 'relative',
        marginLeft : '0vmin',
        marginRight : 'auto',
        borderRadius : '50%',
    },
    inputContainer :{
        paddingTop : '4vmin',
        marginLeft : 'auto',
        marginRight : 'auto',
        width : '50vmin',
        height : '50vmin',
        position : 'relative'
    },
    roundedButton : {
        width : '10vmin',
        height : '10vmin',
        borderRadius: '50%',
        backgroundColor: 'red',
        textAlign : 'center',
        backgroundImage : LockOutlinedIcon
    },
    button: {
        marginLeft : '35vmin',
        marginTop : '40vmin',
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
function ValidateEmail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        console.log("Valid email")
        return (true)
    }
    return (false)
}

function SignUp() {
    const [email,SetEmail] = useState('');
    const [validEmail, SetValidEmail] = useState(false);
    const [password,SetPassword] = useState('');
    const [verifiedPw, SetPwVerified] = useState(false);
    const [name, SetName] = useState('');
    const [mobileNo, SetMobileNo] = useState('');
    const [validMobileNo,SetValidMobileNo] = useState(false);
    const [district, SetDistrict] = useState('');
    const [province, SetProvince] = useState('');
    const [nic, SetNIC] = useState('');
    const [postalCode, SetPostalCode] = useState('');
    const [image,SetImage] = useState(DefaultImg);
    const [file, Setfile] = useState('');
    const disableButton =false; //!(validEmail && verifiedPw && validMobileNo)
    const history = createBrowserHistory();



    const _handleSubmit = e => {
        let data = new FormData();
        data.append("photo", file);
        data.append('email', email);
        data.append('name', name);
        data.append('password', password);
        data.append('mobileNo', mobileNo);
        data.append('district', district);
        data.append('province', province);
        data.append('nic', nic);
        data.append('postalCode', postalCode)
        axios.post('http://localhost:4000/register', data).then(
            (res)=>{
                console.log(res)
                swal({
                    title: "Success",
                    text: "User Registration Successful!",
                    icon: "success",
                }).then((value => {
                    console.log(value);
                    e.preventDefault();
                    history.push('/');
                    window.location.reload();
                }))

            }
        ).catch((error)=>{
            console.log(error);
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "error",
            }).then(
                (value => {
                    console.log(value);
                    e.preventDefault();
                    history.push('/');
                    window.location.reload();
                })
            );
        });

    };
    const agreementHandler = (e) =>{

    }
    const _handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            Setfile(file);
        }

        reader.onload = (e) =>{
            SetImage(e.target.result);
        }

        reader.readAsDataURL(file)
    };

    const classes = useStyles();
    let $imagePreview = (
        <div className={classes.inputContainer}>
            <div className={classes.inputImage}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={_handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Fab  variant="contained" component="span" className={classes.button}>
                        <CameraAltIcon color="error"/>
                    </Fab >
                </label>
            </div>
            <div className={classes.imageCropper}>
                <img className={classes.responsive} src={image}/>
            </div>

            <FormControlLabel

                control={<Checkbox  onChange={agreementHandler} value="accept" color="primary"/>}
                label="By clicking you accept our terms and conditions."
            />
            <Button onClick = {_handleSubmit}
                    style={{ marginTop : '5vmin'}}
                    disabled={disableButton}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={useStyles.submit}
            >
                Register
            </Button>
        </div>
        );



    const emailChangeHandler = (e) =>{
        console.log(e.target.value);
        SetEmail(e.target.value);
        SetValidEmail(ValidateEmail(email))

    }

    const passwordChangeHandler = (e) =>{
        SetPassword(e.target.value)
    }

    const passwordConfirmChangeHandler = (e) =>{
        console.log(e.target.value)
        if(e.target.value == password){
            SetPwVerified(true)
        }else {
            SetPwVerified(false)
        }

    }

    const nameChangeHandler = (e) =>{
        SetName(e.target.value)
    }

    const mobielNoChangeHandler = (e) =>{
        SetMobileNo(e.target.value)
        if(!isNaN(mobileNo) && mobileNo.length ==9){
            SetValidMobileNo(true);
        }else {
            SetValidMobileNo(false);
        }
    }

    const districtChangeHandler = (e) =>{
        SetDistrict(e.target.value)
    }
    const provinceChangeHandler = (e) =>{
        SetProvince(e.target.value)
    }

    const nicChangeHandler = (e) =>{
        SetNIC(e.target.value)
    }
    const postalCodeChangeHandler = (e) =>{
        SetPostalCode(e.target.value)
    }

    return (
        <Grid container component="main" className={classes.root} component={Paper} elevation={6} square>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={5}>
                <div>
                    <div>  {$imagePreview}</div>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={7} >
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <Input
                            autoFocus = {true}
                            id="input-with-icon-adornment"
                            fullWidth
                            error={!validEmail}
                            placeholder="Email"
                            name='email'
                            onChange = {emailChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name = 'password'
                            type= 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Password"
                            onChange={passwordChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name = 'password'
                            type= 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Confirm Password"
                            error={!verifiedPw}
                            onChange={passwordConfirmChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />

                        <Input
                            name = 'name'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Name"
                            onChange={nameChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />

                        <Input
                            name = 'mobileNo'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Mobile No"
                            error={!validMobileNo}
                            onChange={mobielNoChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name = 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="District"
                            onChange={districtChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />

                        <Input
                            name = 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Province"
                            onChange={provinceChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name = 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="NIC number"
                            onChange={nicChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name = 'password'
                            id="input-with-icon-adornment"
                            fullWidth
                            placeholder="Postal Code"
                            onChange={postalCodeChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />


                    </form>
                </div>
            </Grid>
        </Grid>
    );

}

export default withRouter(SignUp);

