import React, {useEffect}  from 'react';
import {getPdfs} from '../../actions/Pdfs.js'
import {useSelector, useDispatch} from 'react-redux'
import {useLocation} from 'react-router'
import { Menu, Grid, CircularProgress, Box, Button } from '@mui/material';

const Results = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const results = useSelector(state => state.search.results)
    console.log(results)
    return(
        results.length === 0 ? (<></>) : (
            <>
                {
                    results.map(result => (
                        <h1 key={result}>{result}</h1>
                    ))
                }
            </>
        )
    )
};
export default Results;
