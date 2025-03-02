"use client";

import * as React from 'react';
import { useState } from 'react';
import {DataGrid, GridActionsCellItem, GridColDef} from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

const initialRows = [
    { id: 1, name: 'Flour', amount: '2', unitOfMeasure: 'cups' },
    { id: 2, name: 'Sugar', amount: '1', unitOfMeasure: 'cup' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function InputIngredient() {

    const [rows, setRows] = useState(initialRows);
    const [newRow, setNewRow] = useState({ id: '', name: '', amount: '', unitOfMeasure: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({ ...newRow, [name]: value });
    };

    const handleAddRow = () => {
        setRows([...rows, { ...newRow, id: rows.length + 1 }]);
        setNewRow({ id: '', name: '', amount: '', unitOfMeasure: '' });
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'unitOfMeasure', headerName: 'Unit of Measure', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteRow(params.id)}
                />
            ),
        },
    ];

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            <div style={{ marginTop: 20 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={newRow.name}
                    onChange={handleInputChange}
                    required
                    style={{ marginRight: 10 }}
                />
                <TextField
                    label="Amount"
                    name="amount"
                    value={newRow.amount}
                    onChange={handleInputChange}
                    required
                    style={{ marginRight: 10 }}
                />
                <TextField
                    label="Unit of Measure"
                    name="unitOfMeasure"
                    value={newRow.unitOfMeasure}
                    onChange={handleInputChange}
                    style={{ marginRight: 10 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddRow}>
                    Add Ingredient
                </Button>
            </div>
        </div>
    );
}
