import React, {useState} from 'react';
import { Card, CardActions, IconButton, CardContent, CardMedia, Button, Typography} from '@mui/material';
import {Clear} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deletePdf, openPdf } from '../../../actions/Pdfs.js';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import DownloadIcon from '@mui/icons-material/Download';
import { getPdfData } from '../../../actions/Pdfs.js'


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
            <Card>
                <Typography variant="h7" textAlign="center">{pdf.name}</Typography>
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
            </Card>
        </>
    );
};
export default Pdf;
