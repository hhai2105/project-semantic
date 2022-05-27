import React, {useState} from 'react';
import {Typography, TextField} from '@mui/material';
import {search} from '../../actions/Search.js';
import {useDispatch} from 'react-redux';

const Searchbar = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        dispatch(search(query)).then(() => setLoading(false));
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Search" id="fullWidth" onChange={(e)=>{setQuery(e.target.value)}}/>
            </form>
            {
                loading?(
                    <Typography>Loading</Typography>
                ):(
                    <></>
                )
            }
        </>
    );
};
export default Searchbar;


