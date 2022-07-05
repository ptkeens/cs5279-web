import { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Alert } from '@mui/material';
import { DataGrid , GridColDef } from '@mui/x-data-grid';
import { UserService } from './UserService';
import { useAuth } from '../Auth/Auth';
import { UserDto } from './UserDtos';
import { UserForm } from './UserForm';

export const UserList = () => {
    const [ userCollection, setUserCollection ] = useState<UserDto[]>([]);
    const [ selectedRows, setSelectedRows ] = useState<number[]>([]);
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ alert, setAlert ] = useState<string>('');
    const [ success, setSuccess ] = useState<string>('');
    const [ editUser, setEditUser ] = useState<UserDto|null>(null);

    const auth = useAuth();
    window.document.title = 'VDAS - Users';

    const svcObj = new UserService(auth.getToken());
    const getUsers = async () => {
        const data = await svcObj.listUsers();
        setUserCollection(data);
    }

    // get our list of users on load
    useEffect(() => {
        getUsers()
            .catch(console.error);
        
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getUsers()
            .catch(console.error);
        setEditUser(null);

        // eslint-disable-next-line
    }, [alert, success]);

    const handleDelete = async () => {
        resetMessaging();
        const svcObj = new UserService(auth.getToken());
        if (selectedRows.length) {
            for (let id of selectedRows) {
                await svcObj.deleteUser(id);
            }
        }

        setSuccess('Record Deleted!');
    }

    const handleEdit = async () => {
        resetMessaging();
        const id = selectedRows[0];
        const row = userCollection.filter((row) => {
            if (row.id === id) {
                return true;
            }

            return false;
        });

        if (row.length === 1) {
            setEditUser(row[0]);
            setShowForm(true);
        }
    }

    const resetMessaging = () => {
        setAlert('');
        setSuccess('');
    }

    const handleAdd = () => {
        resetMessaging();
        setEditUser(null);
        setShowForm(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'firstName', headerName: 'First Name', width: 200, sortable: true },
        { field: 'lastName', headerName: 'Last Name', width: 200, sortable: true },
        { field: 'email', headerName: 'E-mail', width: 400, sortable: true }
    ];

    return (
        <>
            {alert &&
                <Alert severity="error">{alert}</Alert>
            }
            {success && 
                <Alert severity="success">{success}</Alert>
            }
            <Typography variant='h6'>Users</Typography>

            <Box sx={{ height: 500, weight: '100%' }}>
                <DataGrid
                    rows={userCollection}
                    columns={columns}
                    autoPageSize
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        setSelectedRows(
                            ids.map(
                                (x) => parseInt(x.toString())
                            )
                        )
                    }}
                />
            <br/>
            </Box>
            <Grid container width='100%' marginTop="5px">
                <Grid item lg={6} justifyContent="left" alignItems="center" display="flex">
                    <Button variant="contained" disabled={selectedRows.length !== 1} onClick={handleEdit}>Edit Selected</Button>&nbsp;
                    <Button variant="contained" disabled={selectedRows.length === 0} onClick={handleDelete}>Delete Selected</Button>
                </Grid>
                <Grid item lg={6} justifyContent="right" alignItems="center" display="flex">
                    <Button variant="contained" onClick={handleAdd}>Add New User</Button>
                </Grid>
            </Grid>
            <UserForm 
                display={showForm} 
                setDisplay={setShowForm} 
                alert={alert} 
                setAlert={setAlert} 
                success={success} 
                setSuccess={setSuccess}
                user={editUser}
            ></UserForm>
        </>
    )
}