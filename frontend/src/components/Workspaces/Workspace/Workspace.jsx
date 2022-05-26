import React from 'react';
import { Card, CardActions, IconButton, CardContent, CardMedia, Button, Typography} from '@mui/material';
import {Clear} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { deleteWorkspace, openWorkspace } from '../../../actions/Workspaces.js';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

const Workspace = ({workspace}) => {
    const dispatch = useDispatch();
    function handleDelete(){
        dispatch(deleteWorkspace(workspace._id));
    }
    function handleOpen(){
        dispatch(openWorkspace(workspace))
    }
    return (
        <>
            <MenuItem onClick ={handleOpen}>
                <Typography variant="h7" textAlign="center">{workspace.name}</Typography>
            </MenuItem>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <DeleteIcon  sx={{ fontSize: 20 }}/>
            </IconButton>
        </>
    );
};
export default Workspace;
