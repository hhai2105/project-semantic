import React from "react";
import {AUTH} from "../../constants/actions.js";
import { Paper, Button, TextField, Grid, Typography} from "@mui/material";
import {useState} from "react";
import Input from "./Input.jsx";
import {useDispatch} from "react-redux";
import {GoogleLogin} from "react-google-login";
import {signin, signup} from "../../actions/Auth.js";
import {useNavigate} from "react-router-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import GoogleIcon from "@mui/icons-material/Google";

function Auth(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const initialState = { familyName: "", givenName: "", email: "", password: "", confirmPassword: "" };
    const [form, setForm] = useState(initialState);

    function handleSubmit(e){
        e.preventDefault();
        if(isSignup){
            dispatch(signup(form, ()=>navigate));
        }else{
            dispatch(signin(form)).then(() => {
                if(localStorage.getItem("profile")){
                    navigate("/");
                }else{
                    setHasFailed(true);
                }
            });
        }
    }

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    function toggleSignup(){
        setIsSignup((prevState) => !prevState);
    }
    function toggleShowPassword(){
        setShowPassword((prevState) => !prevState);
    }

    function googleSuccess(res){
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type: AUTH, payload: {result, token}});
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    function googleFailure(res){
        console.log(res);
        console.log("google Sign in was unsuccessful");
    }

    return(
        <form onSubmit={handleSubmit}>
            <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{minHeight: "100vh"}}>
                <Paper elevation={3} >
                    <Grid container spacing={2} aign="center" justifyContent="center">
                    </Grid>
                    <Typography align="center" variant="h5"><LockRoundedIcon/></Typography>
                    <Typography align="center" variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
                    {isSignup && (
                        <>
                            <Grid container>
                                <TextField name="familyName" label="family name" onChange={handleChange} half="true" sx={{m: 1}} />
                                <TextField name="givenName" label="givenName" onChange={handleChange} half="true" sx={{m: 1}} />
                            </Grid>
                        </>
                    )}
                    <Grid>
                        <Input name="email" label="email" handleChange={handleChange}/>
                        <Input name="password" label="password" type={showPassword?"text":"password"} handleChange={handleChange} handleShowPassword={toggleShowPassword}/>
                    </Grid>
                    {isSignup && (
                        <>
                            <Grid container >
                                <Input name="confirmPassword" label="repeat password" type={showPassword?"text":"password"} handleChange={handleChange} handleShowPassword={toggleShowPassword}/>
                            </Grid>
                        </>
                    )}
                    <Grid>
                        <div/>
                        <Button type="submit" align="center" variant="contained" sx={{m: 1}}>{isSignup?"Sign Up": "Sign In"}</Button>
                        <Button align="center" onClick={toggleSignup}>{isSignup ? "Already have an account? Sign in":"Don't have an account? Sign up"}</Button>
                    </Grid>
                    <GoogleLogin
                        clientId="595641216970-q7stivunfod31flmk298dmlgd12pt896.apps.googleusercontent.com"
                        render={(renderProps) =>(
                            <Button color="primary" fullWidth onClick={renderProps.onClick} startIcon={<GoogleIcon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    {
                        hasFailed && !isSignup && (
                            <Typography>Error, invalid login</Typography>
                        )
                    }
                </Paper>
            </Grid>
        </form>
    );
}

export default Auth;
