import React, {useState} from 'react';
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';


export default function Result({value}) {
    console.log(value)
    return (
        <>
            <Typography variant="h6">{value.string.split(" ")[0].split(".")[0] + ".pdf page:" + value.string.split(" ")[1] + " ( Score: " + value.string.split(" ")[5] + " ) "}</Typography>
            <img src={`data:image/png;base64,`+value.image}/>
        </>
    );
};


Result.propTypes = {
    value: PropTypes.object,
};
