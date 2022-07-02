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
import { Login } from '../Login/login';
import { PatientList } from '../Patients/PatientList';
import { StudyList }  from '../Studies/StudyList';
import { UserList } from '../Users/UserList';
import { AuthProvider, PrivateRoute, AvoidIfAuthenticated } from '../Auth/Auth';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const drawerWidth = 240;

export const AppFrame = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
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
              <ListItem button component={Link} to={'/'} key='dashboard'>
              <ListItemIcon>
                      <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary='Dashboard'/>                    
              </ListItem>

              <ListItem button component={Link} to={'/patients'} key='patients'>
                  <ListItemIcon>
                      <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary='Patients'/>
              </ListItem>

              <ListItem button component={Link} to={'/studies'} key='studies'>
              <ListItemIcon>
                      <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary='Studies'/>
              </ListItem>

              <ListItem button component={Link} to={'/users'} key='users'>
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
      

      <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientList /></PrivateRoute>} />
          <Route path="/studies" element={<PrivateRoute><StudyList /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />

        <Route path="/login" element={<AvoidIfAuthenticated><Login /></AvoidIfAuthenticated>} />
        </Routes>



    </Box>
  </Box>  
  </BrowserRouter>
  </AuthProvider>
  );
}