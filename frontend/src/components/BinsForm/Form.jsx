import React, {useState, useEffect} from 'react';
import {Button, TextField, Dialog, FormControl, DialogActions, DialogContent, DialogTitle, Select, MenuItem} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {createBin} from '../../actions/Bins.js'

export default function Form() {
    const dispatch = useDispatch()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const workspaceId = useSelector(state => state.workspaces.openWorkspace?._id)
    const handleClickOpen = () => { 
            setOpen(true);
        };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setName(e.target.value)
    }

    function handleSubmit (){
        dispatch(createBin({name, workspaceId}))
        handleClose()
    }

    return (
        <div>
            <Button  color="secondary" variant="contained" onClick={handleClickOpen}>
                Create Bin
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Bin</DialogTitle>
                <DialogContent>
		    <TextField
			autoFocus
			margin="dense"
			id="name"
			label="workspace"
			type="text"
			fullWidth
			variant="standard"
                        onChange={handleChange}
		    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
