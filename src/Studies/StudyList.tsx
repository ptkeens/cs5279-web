import { useState, useEffect } from 'react';
import { useAuth } from '../Auth/Auth';
import { StudiesDto } from './StudiesDto';
import { Alert, Box, Grid, Button, Typography } from '@mui/material';
import { StudiesService } from './StudiesService';
import { StudiesForm, STUDY_FORM_ADD, STUDY_FORM_EDIT } from './StudiesForm';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const StudyList = () => {

    const [ studiesCollection, setStudiesCollection ] = useState<StudiesDto[]>([]);
    const [ selectedRows, setSelectedRows ] = useState<number[]>([]);
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ alert, setAlert ] = useState<string>('');
    const [ success, setSuccess ] = useState<string>('');
    const [ editStudy, setEditStudy ] = useState<StudiesDto|null>(null);
    const [ formMode, setFormMode ] = useState<string>('');

    const auth = useAuth();
    window.document.title = 'VDAS - Studies';

    const svcObj = new StudiesService(auth.getToken());
    const getStudies = async () => {
        const data = await svcObj.listStudies();
        setStudiesCollection(data);
    }

    // get our list of users on load
    useEffect(() => {
        getStudies()
            .catch(console.error);
        
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getStudies()
            .catch(console.error);
        setEditStudy(null);

        // eslint-disable-next-line
    }, [alert, success]);

    const handleDelete = async () => {
        resetMessaging();
        const svcObj = new StudiesService(auth.getToken());
        if (selectedRows.length) {
            for (let id of selectedRows) {
                await svcObj.deleteStudy(id);
            }
        }

        setSuccess('Record Deleted!');
    }

    const handleEdit = async () => {
        resetMessaging();
        const id = selectedRows[0];
        const row = studiesCollection.filter((row) => {
            if (row.id === id) {
                return true;
            }

            return false;
        });

        if (row.length === 1) {
            setFormMode(STUDY_FORM_EDIT);
            setEditStudy(row[0]);
            setShowForm(true);
        } else {
            console.log('no found study in handleEdit');
        }
    }

    const resetMessaging = () => {
        setAlert('');
        setSuccess('');
    }

    const handleAdd = () => {
        resetMessaging();
        setFormMode(STUDY_FORM_ADD);
        setEditStudy(null);
        setShowForm(true);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'title', headerName: 'Study Title', width: 500, sortable: true },
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
                    rows={studiesCollection}
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
                    selectionModel={selectedRows}
                />
            <br/>
            </Box>
            <Grid container width='100%' marginTop="5px">
                <Grid item lg={6} justifyContent="left" alignItems="center" display="flex">
                    <Button variant="contained" disabled={selectedRows.length !== 1} onClick={handleEdit}>Edit Selected</Button>&nbsp;
                    <Button variant="contained" disabled={selectedRows.length === 0} onClick={handleDelete}>Delete Selected</Button>
                </Grid>
                <Grid item lg={6} justifyContent="right" alignItems="center" display="flex">
                    <Button variant="contained" onClick={handleAdd}>Add New Study</Button>
                </Grid>
            </Grid>
            <StudiesForm 
                display={showForm} 
                setDisplay={setShowForm} 
                alert={alert} 
                setAlert={setAlert} 
                success={success} 
                setSuccess={setSuccess}
                study={editStudy}
                setSelectedRows={setSelectedRows}
                mode={formMode}
                setFormMode={setFormMode}
            ></StudiesForm>
        </>
    )
}