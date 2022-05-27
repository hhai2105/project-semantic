import React from "react";
import { IconButton, Typography, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPdf } from "../../actions/Pdfs.js";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';
import FileBase from 'react-file-base64';

const Form = () => {
    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState({});

    const [show, setShow] = useState(false);
    const [uploading, setUploading] = useState(false);
    const showForm = () => {setShow(true);};
    const hideForm = () => {setShow(false);};


    function handleSubmit(e){
        e.preventDefault();
        setUploading(true)
        dispatch(createPdf(selectedFiles)).then(()=>{
            setUploading(false)
        })
    }
    return (
        <>
            <Button onClick={showForm} variant="contained">
                Create PDF
            </Button>
            <Dialog open={show} onClose={hideForm}>
                <DialogTitle>Create Pdf</DialogTitle>
                <DialogContent>
                    <FileBase hidden type="file" multiple={true} onDone={(e) => setSelectedFiles(e)} />
                </DialogContent>
                {
                    uploading?(
                        <Typography variant="h6">Uploading...</Typography>
                    ):(
                        <></>
                    )
                }
                <DialogActions>
                    <Button onClick={hideForm}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default Form;
