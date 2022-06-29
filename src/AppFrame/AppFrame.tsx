import { MouseEvent } from 'react';
import { Container, AppBar, Toolbar, Button, Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './AppFrame.css';

const panelWidth = 200;

export const AppFrame = ({token} : {token: string}) => {
    
    const handleLogout = (e: MouseEvent<HTMLElement>) : void => {
        e.preventDefault();
        localStorage.removeItem('vdas_token');
    }

    return (
        <Container>
        <AppBar
            position="fixed"
            sx={{ padding: '20px', marginLeft: {panelWidth}, zIndex: '1201'}}
        >
            <Toolbar disableGutters={true}>
                <Box 
                    component="img"
                    sx={{ maxWidth: '120px'}}
                    src='/logo.png' />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '50px'}}>
                    CHLA VDAS
                </Typography>
                <Button variant="outlined" sx={{ color: 'white' }} onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={true}>
            <List sx={{marginTop: '115px'}}>
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
        </Drawer>
        </Container>
    )
}