import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Input({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12} sx={{m: 1}}>
            <TextField name={name} onChange={handleChange} variant="outlined" required fullWidth label={label} autoFocus={autoFocus} type={type}
                       InputProps={name === "password" || name === "confirmPassword" ? {
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton onClick={handleShowPassword}>
                                       {type === "password" ? <Visibility /> : <VisibilityOff />}
                                   </IconButton>
                               </InputAdornment>
                           ),
                       } : null}
            />
        </Grid>
    );}

Input.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    half: PropTypes.bool,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    handleShowPassword: PropTypes.func,
};
export default Input;
