import React, {useEffect}  from 'react';
import Workspace from './Workspace/Workspace';
import {getWorkspaces} from '../../actions/Workspaces.js'
import {useSelector, useDispatch} from 'react-redux'
import {useLocation} from 'react-router'
import { Menu, Grid, CircularProgress, Box, Button } from '@mui/material';

const Workspaces = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
	dispatch(getWorkspaces());
    },[location, dispatch]);
    const workspaces = useSelector((state) => state.workspaces.workspaces);
    console.log(workspaces)
    return (
	workspaces.length === 0 ? <CircularProgress /> : (
	    <>
		{workspaces.map((workspace) => (
		    <Workspace key={workspace._id} workspace={workspace}/>
		))}
	    </>
	)
    )
};
export default Workspaces;
