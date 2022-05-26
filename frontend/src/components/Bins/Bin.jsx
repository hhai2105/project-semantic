import React from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteBin} from "../../actions/Bins.js";
import {IconButton, Grid, Box, Paper, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesForm from "../Notesform/Form.jsx";

export default function Bin({bin}) {
    const dispatch = useDispatch();
    function handleDelete(){
        dispatch(deleteBin(bin._id));
    }
    return (
        <Paper elevation={10} sx = {{maxHeight: 200, overflow: "auto"}}>
            <Grid container justifyContent="center">
		<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                    <Typography align="center" variant="h5">{bin.name}</Typography>
		</Box>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
                <NotesForm binId={bin._id}/>
            </Grid>
        </Paper>
    );
}

Bin.propTypes = {
    bin: PropTypes.object
};
