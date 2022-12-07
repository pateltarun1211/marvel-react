// React imports
import React, { useState } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import{
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'

// Local imports
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";
import { HeroForm } from "../HeroForm";
import { getAuth } from "firebase/auth";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 120,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250,
        editable: true,
    },
    {
        field: 'comics_appeared_in',
        headerName: 'Appearances',
        type: 'year',
        width: 60,
        editable: true,
    },

    {
        field: 'super_power',
        headerName: 'Super Powers',
        width: 100,
        editable: true,
    },
    {
        field: 'date_created',
        headerName: 'Date Created',
        type: 'number',
        width: 100,
        editable: true,
    },
];

interface gridData{
    data:{
        id?:string;
    }
}

export const DataTable = () => {
    let { heroData, getData } = useGetData();
    let [open, setOpen] = useState(false)
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData) // a list of id's from checked rows
    //Check our local storage for authenticated user
    const myAuth = localStorage.getItem('myAuth')
    console.log(myAuth);
    //Conditionally Render DataTable for Authenticated Users
    if (myAuth== 'true'){
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={heroData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {setData(newSelectionModel);}}
                    {...heroData}
                />
                {/* Popup Functionality for Update, and Delete Button lives*/}
                <Button onClick={handleOpen}>Update</Button>
                <Button variant='contained' color="secondary" onClick={deleteData}>Delete</Button>

                {/* Dialog Open */}
                <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>Update a Superhero</DialogTitle>
                    <DialogContent>
                    <DialogContentText>Hero ID: {gridData[0]}</DialogContentText>
                        <HeroForm id= {`${gridData[0]}`} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
            //Hide DataTable for non-authed users
            <div>
                <h3>Please Sign In to View Your Favorite Superheroes</h3>
            </div>
        )
    }
    
}