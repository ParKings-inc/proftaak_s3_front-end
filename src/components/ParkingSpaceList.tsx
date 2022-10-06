import React, { Component } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 45},
    {field: 'Name', headerName: 'NAME', width: 90},
    {field: 'Free', headerName: 'FREE', width: 90},
];

const rows = [
    { id: 1, Name: 'Snow', firstName: 'Jon', Free: 'Yes'},
    { id: 2, Name: 'Lannister', firstName: 'Cersei', Free: 'No'},
    { id: 3, Name: 'Lannister', firstName: 'Jaime', Free: 'Yes'},
    { id: 4, Name: 'Stark', firstName: 'Arya', Free: 'Yes'},
    { id: 5, Name: 'Targaryen', firstName: 'Daenerys', Free: 'No'},
    { id: 6, Name: 'Melisandre', firstName: null, Free: 'No'},
    { id: 7, Name: 'Clifford', firstName: 'Ferrara', Free: 'No'},
    { id: 8, Name: 'Frances', firstName: 'Rossini', Free: 'No'},
    { id: 9, Name: 'Roxie', firstName: 'Harvey', Free: 'Yes' },
  ];

export default class ParkingSpaceList extends Component {
    constructor(props: any){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="mt-3">
                <Box sx={{ height: 520, width: '95vw' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        isRowSelectable={(params: any) => params.row.Free === 'Yes'}
                        checkboxSelection
                    />
                    
                </Box>
            </div>
        )
    }
}
