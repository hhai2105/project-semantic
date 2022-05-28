import React, {useEffect}  from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Menu, Grid, CircularProgress, Box, Button } from '@mui/material';
import Result from './Result/Result.jsx';

const Results = () => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.search.results)
    console.log(results)
    return(
        results.length === 0 ? (<></>) : (
            <>
                {
                    results.map(result => (
                        <Result key={result} value={result}/>
                    ))
                }
            </>
        )
    )
};
export default Results;
