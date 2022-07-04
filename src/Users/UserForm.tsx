import { useEffect, useState, SetStateAction, Dispatch, ChangeEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateUserDto, UpdateUserDto, UserDto } from './UserDtos';
import { Box, Button, Alert, TextField } from '@mui/material';
import * as EmailValidator from 'email-validator';
import { UserService } from './UserService';
import { useAuth } from '../Auth/Auth';

export const USER_FORM_ADD = 'add';
export const USER_FORM_EDIT = 'edit';

export interface UserFormProps {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    user?: UserDto|null;
    alert: string;
    setAlert: Dispatch<SetStateAction<string>>;
    success: string;
    setSuccess: Dispatch<SetStateAction<string>>;
}

export const UserForm = (props: UserFormProps) => {
    const [ open, setOpen ] = useState<boolean>(props.display);
    const [ mode, setMode ] = useState<string>(USER_FORM_ADD);
    
    const [ email, setEmail ] = useState<string>('');
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ error, setError ] = useState<string>('');

    const auth = useAuth();

    // watch for an open request from outside of the component
    useEffect(() => {
        setOpen(props.display);
    }, [props.display]);

    useEffect(() => {
        if (props.user) {
            setMode(USER_FORM_EDIT);
            setEmail(props.user.email);
            setFirstName(props.user.firstName);
            setLastName(props.user.lastName);
         } else {
            setMode(USER_FORM_ADD);
         }
    }, [props.user]);

    const handleSave = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            validateForm();

            const svcObj = new UserService();
            svcObj.setToken(auth.token);

            let response = null;

            if (mode === USER_FORM_ADD) {
                response = await svcObj.addUser({
                    email,
                    firstName,
                    lastName,
                    password
                } as CreateUserDto);
            } else {
                if (props.user) {
                    const updateFields : UpdateUserDto = {
                        email,
                        firstName,
                        lastName
                    };

                    if (password && password.length) {
                        updateFields.password = password;
                    }

                    response = await svcObj.updateUser(props.user.id, updateFields);
                }
            }

            if (response) {
                handleClose();
                let msg = (mode === USER_FORM_ADD) ? 'New User Added' : 'User Saved';
                props.setSuccess(msg);
            } else {
                handleClose();
                props.setAlert('Error when saving user!');
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    const validateForm = () => {
        const fieldConstraints = {
            email: {
                error: 'You must supply a valid e-mail address!',
                validate: (val: string) => {
                    return EmailValidator.validate(val) && val.length < 128;
                },
                value: email
            },
            firstName: {
                error: 'You must supply a valid first name',
                validate: (firstName: string) => {
                    const regex = /[\w\'\-\.\s]+/;
                    return regex.test(firstName) && firstName.length < 64;
                },
                value: firstName
            },
            lastName: {
                error: 'You must supply a valid last name',
                validate: (lastName: string) => {
                    const regex = /[\w\'\-\.\s]+/;
                    return regex.test(lastName) && lastName.length < 64;
                },
                value: lastName
            },
            password: {
                // at least 1 lowercase letter, 1 uppercase letter, one digit and one special character
                // minimum 8 characters
                error: 'You must supply a non-empty password of at least 8 characters containing at least one lowercase letter, one uppercase letter, one number, and one special character',
                validate: (password: string) => {
                    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                    return regex.test(password);
                },
                value: password
            }
        }

        for (let param of Object.values(fieldConstraints)) {
            if (mode == USER_FORM_ADD && !param.validate(param.value)) {
                throw new Error(param.error);
            } else {
                if (param.value && !param.validate(param.value)) {
                    throw new Error(param.error);
                }
            }
        }
    }

    const handleReset = async () => {
        if (mode == USER_FORM_ADD) {
            resetForm();
        } else {
            if (props.user) {
                setEmail(props.user.email);
                setFirstName(props.user.firstName);
                setLastName(props.user.lastName);
                setPassword('');
            }
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
                {error && 
                    <Alert severity="error">{error}</Alert>
                }
                <Box component="form" autoComplete="off" onSubmit={handleSave} sx={{ p: '10px', m: '10px'}}>
                    <TextField
                        id="firstName"
                        variant="outlined"
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        sx={{width: '100%'}}
                        value={firstName}
                        required={mode === USER_FORM_ADD}
                    />
                    <TextField
                        id="lastName"
                        variant="outlined"
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        sx={{width: '100%', marginTop: '10px'}}
                        value={lastName}
                        required={mode === USER_FORM_ADD}
                    />
                    <TextField 
                        id="email" 
                        variant="outlined" 
                        label="Email Address" 
                        onChange={e => setEmail(e.target.value)} 
                        sx={{width: '100%', marginTop: '10px'}}
                        value={email}
                        required={mode === USER_FORM_ADD}
                    />
                    <TextField
                        id="password" 
                        variant="outlined" 
                        label="Password" 
                        type="password" 
                        onChange={(e => setPassword(e.target.value))} 
                        sx={{width: '100%', marginTop: '10px'}}
                        required={mode === USER_FORM_ADD}
                    />
                    <DialogActions>
                        <Button type="submit" variant="contained" >Save</Button>&nbsp;
                        <Button onClick={handleReset} variant="contained">Reset</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    )
}