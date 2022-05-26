import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import {getBins} from "../../actions/Bins.js";
import Bin from "./Bin.jsx";
export default function Bins(){
    const dispatch = useDispatch();

    useEffect(() => {
	dispatch(getBins());
    },[location, dispatch]);

    const bins = useSelector(state => state.workspaces.bins);
    const openWorkspace = useSelector(state => state.workspaces.openWorkspace);
    return (
        openWorkspace !== null?(
            <Grid container spacing={3} sx={{justifyContent: "space-evenly"}}>
                {
                    openWorkspace.bins.map(binId => {
                        let b = bins.filter(bin => bin._id === binId)[0];
                        return (
                            <Grid key={b._id} item xs={2}>
                                <Bin bin={b}/>
                            </Grid>
                        );
                    })
                }
            </Grid>
        ):(
            <></>
        )
    );
}
