import {useState, useEffect, MouseEvent}  from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import {Dashboard} from '../Dashboard/Dashboard';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const drawerWidth = 240;
const tokenName = 'vdas_token';

export const AppFrame = () => {

    const [ token, setToken ] = useState<string|null>();
    const [ isOpened, setIsOpened ] = useState<boolean>(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    // init of component, check for token & set logged in
    useEffect(() => {
        console.log('inside appFrame init useEffect');
        if (!token && localStorage.getItem(tokenName)) {
            setToken(localStorage.getItem(tokenName));
        }

        // if we have a token, set our authenticated state to true
        if (token) {
            console.log('setting isLoggedIn from token value');
            setIsLoggedIn(true);
        }
    }, []);

    // handler for logging out
    const handleLogout = (e: MouseEvent<HTMLElement>) : void => {
        e.preventDefault();
        localStorage.removeItem(tokenName);
        setIsLoggedIn(false);
    }

    const handleLogin = (e: MouseEvent<HTMLElement>) : void => {
        e.preventDefault();
    }

    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <Box 
            component="img"
            sx={{ maxWidth: '120px'}}
            src='/logo.png' />
          <Typography variant="h6" noWrap component="div" sx={{ marginLeft: '20px' }}>
            CHLA VDAS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem button key='dashboard'>
                <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard'/>                    
                </ListItem>

                <ListItem button key='patients'>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Patients'/>
                </ListItem>

                <ListItem button key='studies'>
                <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary='Studies'/>
                </ListItem>

                <ListItem button key='users'>
                <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary='Users'/>
                </ListItem>
            </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>

      </Box>
    </Box>  
    );
}