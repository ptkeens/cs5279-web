import { useState, ChangeEvent } from 'react';
import { UserService } from '../User/UserService';
import { Grid, Box, Button, Alert, TextField, Typography } from '@mui/material';

export default function Login({setToken}: {setToken: (value: string) => void}) {
    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ error, setError ] = useState<string>();

    const userService = new UserService();

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await userService.login(email, password);
            setToken(result);
        } catch (err) {
            console.log(err);
            setError('There was an error when trying to login!');
        }
    }

    return(
        <Grid 
        container
        direction="column" 
        justifyContent="center" 
        alignItems="center"
        minHeight="90vh"
      >
        <Grid item xs={4} md={4} sx={{ background: '#fff', padding: '10px', minWidth: '300px' }}>
            <Box sx={{ backgroundColor: '#005A92'}} display="flex" justifyContent="center">
                <img src="/logo.png" style={{marginLeft: 'auto', marginRight: 'auto'}} />
            </Box>
            {error && 
                    <Alert severity="error">{error}</Alert>
            }
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ p: '5px', m: '5px' }}>
                <Typography variant='h6' align='center'>VDAS Login</Typography>
                <TextField 
                    id="email" 
                    variant="outlined" 
                    label="Email Address" 
                    onChange={e => setEmail(e.target.value)} 
                    sx={{width: '100%'}}
                /><br/>
                <TextField 
                    id="password" 
                    variant="outlined" 
                    label="Password" 
                    type="password" 
                    onChange={(e => setPassword(e.target.value))} 
                    sx={{width: '100%', marginTop: '10px'}}
                /><br/>
                <Button 
                    variant="contained" 
                    type="submit"
                    sx={{width: '100%', marginTop: '10px'}}
                >
                    Login
                </Button>
            </Box>
        </Grid>
    </Grid>
    );
}
