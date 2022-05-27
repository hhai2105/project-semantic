import React, {useState} from 'react';
import { Paper, IconButton, CardContent, CardMedia, Button, Typography, Grid} from '@mui/material';
import {Clear} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deletePdf, openPdf } from '../../../actions/Pdfs.js';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import DownloadIcon from '@mui/icons-material/Download';
import { getPdfData } from '../../../actions/Pdfs.js'
import PropTypes from 'prop-types';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const Pdf = ({pdf}) => {
    const dispatch = useDispatch();
    const [downloading, setDownloading] = useState(false);
    function handleDelete(){
        dispatch(deletePdf(pdf._id));
    }
    function handleDownload(){
        setDownloading(true);
        dispatch(getPdfData(pdf)).then(
            () => setDownloading(false)
        );

    }
    return (
        <>
            <Paper elevation={3}>
                <Grid container direction="row" sx={{m: 3}}>
                    <IconButton disabled>
                        <PictureAsPdfIcon/>
                    </IconButton>
                    <Typography variant="h6" textAlign="left">{pdf.name}</Typography>
                            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon  sx={{ fontSize: 20 }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="Download" onClick={handleDownload}>
                    <DownloadIcon  sx={{ fontSize: 20 }}/>
                </IconButton>
                {
                    downloading?(
                        <Typography>...Downloading</Typography>
                    ):(
                        <></>
                    )
                }
                </Grid>
            </Paper>
        </>
    );
};
Pdf.propTypes = {
    pdf: PropTypes.Object
};
export default Pdf;
