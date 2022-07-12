import { useEffect, useState, SetStateAction, Dispatch, ChangeEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateStudiesDto, UpdateStudiesDto, StudiesDto } from './StudiesDto';
import { Box, Button, Alert, TextField } from '@mui/material';
import { StudiesService } from './StudiesService';
import { useAuth } from '../Auth/Auth';

export const STUDY_FORM_ADD = 'add';
export const STUDY_FORM_EDIT = 'edit';

export interface UserFormProps {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    study?: StudiesDto|null;
    alert: string;
    setAlert: Dispatch<SetStateAction<string>>;
    success: string;
    setSuccess: Dispatch<SetStateAction<string>>;
    setSelectedRows: Dispatch<SetStateAction<any>>;
    mode: string;
    setFormMode: Dispatch<SetStateAction<string>>;
}

export const StudiesForm = (props: UserFormProps) => {
    const [ open, setOpen ] = useState<boolean>(props.display);
    
    const [ title, setTitle ] = useState<string>('');
    const [ error, setError ] = useState<string>('');

    const auth = useAuth();

    // watch for an open request from outside of the component
    useEffect(() => {
        setOpen(props.display);
        handleReset();
            
        // eslint-disable-next-line
    }, [props.display]);

    const handleSave = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            validateForm();

            const svcObj = new StudiesService();
            svcObj.setToken(auth.token);

            let response = null;

            if (props.mode === STUDY_FORM_ADD) {
                response = await svcObj.addStudy({
                    title
                } as CreateStudiesDto);
            } else {
                if (props.study) {
                    const updateFields : UpdateStudiesDto = {
                        title
                    };

                    response = await svcObj.updateStudy(props.study.id, updateFields);
                }
            }

            if (response) {
                handleClose();
                let msg = (props.mode === STUDY_FORM_ADD) ? 'New Study Added' : 'Study Saved';
                props.setSuccess(msg);
            } else {
                handleClose();
                props.setAlert('Error when saving study!');
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }

    const validateForm = () => {
        const fieldConstraints = {
            title: {
                error: 'You must supply a valid study title',
                validate: (title: string) => {
                    const regex = /[\w'-.\s]+/;
                    return regex.test(title) && title.length < 255;
                },
                value: title
            }
        }

        for (let param of Object.values(fieldConstraints)) {
            if (props.mode === STUDY_FORM_ADD && !param.validate(param.value)) {
                throw new Error(param.error);
            } else {
                if (param.value && !param.validate(param.value)) {
                    throw new Error(param.error);
                }
            }
        }
    }

    const handleReset = async () => {
        if (props.mode === STUDY_FORM_ADD) {
            resetForm();
        } else {
            if (props.study) {
                setTitle(props.study.title);
            }
        }
    }

    const resetForm = () => {
        setTitle(props.mode === STUDY_FORM_ADD ? '' : props.study.title);
    }

    const handleClose = async () => {
        props.setDisplay(false);
        props.setSelectedRows([]);
        resetForm();
    }

    return (
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Study Form</DialogTitle>
            <DialogContent>
                <DialogContentText>Use this form to {props.mode === STUDY_FORM_ADD ? 'add' : 'edit'} a study</DialogContentText>
                {error && 
                    <Alert severity="error">{error}</Alert>
                }
                <Box component="form" autoComplete="off" onSubmit={handleSave} sx={{ p: '10px', m: '10px'}}>
                    <TextField
                        id="title"
                        variant="outlined"
                        label="Study Title"
                        onChange={e => setTitle(e.target.value)}
                        sx={{width: '100%'}}
                        value={title}
                        required={props.mode === STUDY_FORM_ADD}
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