import React, {useEffect}  from 'react';
import {getPdfs} from '../../actions/Pdfs.js'
import {useSelector, useDispatch} from 'react-redux'
import {useLocation} from 'react-router'
import { Menu, Grid, CircularProgress, Box, Button } from '@mui/material';

const Pdfs = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
	dispatch(getPdfs());
    },[location, dispatch]);
    const pdfs = useSelector((state) => state.pdfs.pdfs);
    return (
        <>
        </>
    )
};
export default Pdfs;
