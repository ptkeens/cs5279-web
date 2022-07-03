import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserDto } from './UserDtos';
import { Grid, Box, Button, Alert, TextField } from '@mui/material';

export const USER_FORM_ADD = 'add';
export const USER_FORM_EDIT = 'edit';

export interface UserFormProps {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    user?: UserDto;
}

export const UserForm = (props: UserFormProps) => {
    const [ open, setOpen ] = useState<boolean>(props.display);
    const [ mode, setMode ] = useState<string>(props.user ? USER_FORM_EDIT : USER_FORM_ADD);
    
    const [ email, setEmail ] = useState<string>('');
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    if (props.user) {
        setEmail(props.user.email);
        setFirstName(props.user.firstName);
        setLastName(props.user.lastName);
    }

    // watch for an open request from outside of the component
    useEffect(() => {
        setOpen(props.display);
    }, [props.display]);

    const handleSave = async () => {

    }

    const handleReset = async () => {
        if (mode == USER_FORM_ADD) {
            resetForm();
        } else if (props.user) {
            setEmail(props.user.email);
            setFirstName(props.user.firstName);
            setLastName(props.user.lastName);
            setPassword('');
        }
    }

    const resetForm = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    }

    const handleClose = async () => {
        props.setDisplay(false);
        resetForm();
    }

    return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>User Form</DialogTitle>
            <DialogContent>
                <DialogContentText>Use this form to {mode === USER_FORM_ADD ? 'add' : 'edit'} a user</DialogContentText>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSave} sx={{ p: '10px', m: '10px'}}>
                <TextField 
                    id="email" 
                    variant="outlined" 
                    label="Email Address" 
                    onChange={e => setEmail(e.target.value)} 
                    sx={{width: '100%'}}
                    value={email}
                />
                <TextField
                    id="firstName"
                    variant="outlined"
                    label="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    sx={{width: '100%', marginTop: '10px'}}
                    value={firstName}
                />
                <TextField
                    id="lastName"
                    variant="outlined"
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    sx={{width: '100%', marginTop: '10px'}}
                    value={lastName}
                />
                <TextField
                    id="password" 
                    variant="outlined" 
                    label="Password" 
                    type="password" 
                    onChange={(e => setPassword(e.target.value))} 
                    sx={{width: '100%', marginTop: '10px'}}
                />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>&nbsp;
                <Button onClick={handleReset}>Reset</Button>
            </DialogActions>
        </Dialog>
    )
}