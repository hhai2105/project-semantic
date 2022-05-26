import React from 'react';
import { IconButton, TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWorkspace } from '../../actions/Workspaces.js';
import AddIcon from '@mui/icons-material/Add';

const Form = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: ''
    });

    const [show, setShow] = useState(false);
    const showForm = () => {setShow(true)}
    const hideForm = () => {setShow(false)}

    function handleSubmit(){
        const form = {userId: JSON.parse(localStorage.getItem("profile")).result._id, name: formData.name}
        dispatch(createWorkspace(form))
        hideForm()
    }

    function handleChange(e){
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }

    return (
        <>
	    <IconButton onClick={showForm} variant="outlined">
	        <AddIcon/>
	    </IconButton>
	    <Dialog open={show} onClose={hideForm}>
		<DialogTitle>Create Workspace</DialogTitle>
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
		    <Button onClick={hideForm}>Cancel</Button>
		    <Button onClick={handleSubmit}>Create</Button>
		</DialogActions>
	    </Dialog>
        </>
    );
}
export default Form
