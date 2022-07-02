import { useState, ChangeEvent } from 'react';
import { useAuth } from '../Auth/Auth';
import { Grid, Box, Button, Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ error, setError ] = useState<string>();
    const auth = useAuth();

    console.log('auth context in login', auth);

    window.document.title = 'VDAS - Login';

    let navigate = useNavigate();

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        setError('');
        try {

            if (!email || email.length === 0 || typeof email !== 'string') {
                setError("You must supply a valid e-mail address!");
                return;
            }

            if (!password || password.length === 0 || typeof password !== 'string') {
                setError("You must supply a valid password");
                return;
            }

            await auth.login(email, password);
            navigate('/', { replace: true });
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
        <Grid item xs={4} md={4} sx={{ background: '#fff', padding: '10px', minWidth: '350px', border: '1px dashed #ccc' }}>
            <Box sx={{ backgroundColor: '#005A92'}} display="flex" justifyContent="center">
                <img alt="CHLA Logo" src="/logo.png" style={{marginLeft: 'auto', marginRight: 'auto'}} />
            </Box>
            {error && 
                    <Alert severity="error">{error}</Alert>
            }
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ p: '10px', m: '10px'}}>
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