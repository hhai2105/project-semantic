import React, {useState} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import {createNote} from "../../actions/Notes.js";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function Form(bin) {
    const dispatch = useDispatch();
    const [noteData, setNoteData] = useState({ note: "", binId: bin.binId, due: "", file: "" });
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { 
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit (){
        dispatch(createNote(noteData));
        handleClose();
    }

    function handleDueDateChange(newDate){
        setNoteData({...noteData, due: newDate});
    }
    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <Button  color="secondary" variant="contained" onClick={handleClickOpen}>
                    Create Note
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogContent>
                        <TextField name="note" variant="outlined" label="Note" fullWidth value={noteData.note} onChange={(e) => setNoteData({ ...noteData, note: e.target.value })} />
                        <Button fullWidth variant="outlined" component="label" >
                            Upload File
                            <input hidden type="file" className="custom-file-input" name="myImage" onChange= {({file}) => setNoteData({...noteData, selectedFile: file})} />
                        </Button>
                        <div className="customDatePickerWidth" width="100%">
                            <DesktopDatePicker label="Due Date" value={noteData.due} fullWidth onChange={(newValue) => {handleDueDateChange(newValue);}} renderInput={(params) => <TextField {...params} />} sx={{width: "100%"}} />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}
