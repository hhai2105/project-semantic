import React from "react";
import { IconButton, Typography, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPdf } from "../../actions/Pdfs.js";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';

const Form = () => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState({});

    const [show, setShow] = useState(false);
    const showForm = () => {setShow(true);};
    const hideForm = () => {setShow(false);};


    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("myFile", selectedFile, selectedFile.name);
        console.log(formData.get("myFile"))
        axios.post("http://localhost:5000/pdfs/add", formData);
        // dispatch(createPdf(formData));
        hideForm();
    }

    return (
        <>
            <IconButton onClick={showForm} variant="outlined">
                <AddIcon/>
            </IconButton>
            <Dialog open={show} onClose={hideForm}>
                <DialogTitle>Create Pdf</DialogTitle>
                <DialogContent>
                    <Typography>{selectedFile?.name}</Typography>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(e)=>{setSelectedFile(e.target.files[0])}}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default Form;
