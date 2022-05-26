import {SIGNOUT} from '../../constants/actions.js'
import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, Avatar, IconButton } from '@mui/material'
import {Link } from 'react-router-dom'

import Workspaces from '../Workspaces/Workspaces.jsx'
import WorkspaceForm from '../WorkspacesForm/Form.jsx'
import BinsForm from '../BinsForm/Form.jsx'

function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(null);
    const openWorkspace = useSelector(state => state.workspaces.openWorkspace)

    function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
	    hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	for (i = 0; i < 3; i += 1) {
	    const value = (hash >> (i * 8)) & 0xff;
	          color += `00${value.toString(16)}`.slice(-2);
	      }
	      /* eslint-enable no-bitwise */

	      return color;
          }

    function stringAvatar(name) {
	return {
	    sx: {
		bgcolor: stringToColor(name),
	    },
	    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
    }

    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem('profile'))?.result);
    },[location, dispatch]);
    function handleShowUserMenu(e){
        setShowUserMenu(e.currentTarget);
    }

    function handleCloseUserMenu(){
        setShowUserMenu(null);
    }

    function signout(){
        dispatch({type: SIGNOUT, data: null});
        navigate("/");
    }
    return(
        <>
	    <AppBar position="fixed" variant="dense">
	        <Toolbar>
		    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                        <MenuItem key="UKG" onClick={() => {navigate("/")}}>
                            <Typography variant="h6" textAlign="center">Workspace</Typography>
                        </MenuItem>
		        {
		            user == null?(
			        <>
			        </>
		            ):(
			        <>
			            <Workspaces/>
				    <WorkspaceForm/>
                                    {
                                        openWorkspace?(
                                            <MenuItem>
                                                <Typography variant="h6">{openWorkspace.name}</Typography>
                                            </MenuItem>
                                        ):(
                                            <></>
                                        )
                                    }
			        </>
			    )
		        }
		    </Box>
		    {
		        user == null? (
			    <>
			        <Button component={Link} to={"/authentication"} variant="contained" color="primary">Sign In</Button>
			    </>
		        ) : (
			    <>
                                {
                                    openWorkspace?(
                                        <BinsForm/>
                                    ):(
                                        <></>
                                    )
                                }
			        <IconButton onClick={handleShowUserMenu}>
				    {
				        user?.imageUrl && user?.imageUrl !== ""?(
					    <Avatar src={user?.imageUrl} ></Avatar>
				        ):(
					    <Avatar {...stringAvatar(`${user?.familyName} ${user?.givenName}`)} />
				        )
				    }
			        </IconButton>
			        <Menu sx={{ mt: '45px' }}
				      id="menu-appbar"
				      anchorEl={showUserMenu}
				      anchorOrigin={{
				          vertical: 'top',
				          horizontal: 'right',
				      }}
				      keepMounted
				      transformOrigin={{
				          vertical: 'top',
				          horizontal: 'right',
				      }}
				      open={Boolean(showUserMenu)}
				      onClose={handleCloseUserMenu}
			        >
				    <MenuItem key="Home" component={Link} to={"/"}>
				        <Typography textAlign="center">Home</Typography>
				    </MenuItem>
				    <MenuItem key="Logout" onClick={signout}>
				        <Typography textAlign="center">Sign Out</Typography>
				    </MenuItem>
			        </Menu>
			    </>
		        )
		    }
	        </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    )
}

export default Navbar;
