import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem, GridRowId, GridRowModes, GridRowModesModel } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSession } from 'next-auth/react';
import { PantryIngredient } from "../../Classes/PantryIngredient";
import { GetIngredientsByUser } from "@/Get-Post Requests/PantryIngredient/getIngredientsByUser";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Recipe} from "../../Classes/Recipe";
import {PostRecipe} from "@/Get-Post Requests/Recipe/postRecipe";
import {useState} from "react";



export default function IngredientsTable() {
    const [rows, setRows] = React.useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        name: '',
        amount: 0,
        unitOfMeasure: '',
        buyDate: '',
        userName: ''
    });

    React.useEffect(() => {
        async function fetchData() {
            if (session?.user.name) {
                const pantryIngredients: PantryIngredient[] = await GetIngredientsByUser(session.user.name);

                const newRows = pantryIngredients.map((ingredient, index) => ({
                    id: index,
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unitOfMeasure: ingredient.unitOfMeasure,
                    buyDate: ingredient.buyDate,
                    userName: ingredient.username,
                }));

                setRows(newRows);
            }
        }

        fetchData();
    }, [session]);

    // Add a new row (ingredient)
    const handleAddClick = () => {
        const newId = rows.length + 1;
        const newRow = {
            id: newId,
            name: '',
            amount: 0,
            unitOfMeasure: '',
            buyDate: '',
            userName: session?.user.name || '',
        };
        setRows([...rows, newRow]);
        setRowModesModel({
            ...rowModesModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        });
    };

    // Save an edited row
    const handleSaveClick = async (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

        //
        // const ingredient = new PantryIngredient (
        //     formData.name,
        //     formData.amount,
        //     formData.unitOfMeasure,
        //     formData.buyDate,
        //     formData.userName,
        // );
        //
        // console.log(ingredient);
        // const result = await PostRecipe(ingredient);
        //
        //
        //



    };

    // Handle deleting a row
    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    // Handle editing a row
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Item', flex: 2, editable: true },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            editable: true,
        },
        {
            field: 'unitOfMeasure',
            headerName: 'Unit',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            editable: true,
        },
        {
            field: 'buyDate',
            headerName: 'Date Bought',
            flex: 2,
            headerAlign: 'left',
            align: 'left',
            editable: true,
        },
        {
            field: 'userName',
            headerName: 'Who Bought It',
            flex: 2,
            headerAlign: 'left',
            align: 'left',
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            flex: 1,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<AddIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<RemoveCircleOutlineIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ height: 500, width: '100%'}}>
            <Typography variant='h2' sx={{marginBottom: "1.5rem",
                fontWeight: "bold", textDecoration:"underline",
                textDecorationColor: "#F08148", textUnderlineOffset: "4px"
            }}>
                {session.user.name}'s Pantry
            </Typography>
            <Paper id = "gridBox" sx={{ width: '100%', mb: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    sx={{
                        '.MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F04D51',
                            color: 'black',
                            fontWeight: 'bold',
                        },
                        '.MuiDataGrid-columnHeaderTitle': {
                            color: 'black',
                            backgroundColor: '#F04D51',
                            fontWeight: 'bold',
                        },
                        '.MuiDataGrid-columnHeader': {
                            backgroundColor: '#F04D51',
                            color: 'black',
                            fontWeight: 'bold',
                        },
                    }}
                />

                        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                            Add Ingredient
                        </Button>
            </Paper>
        </Box>
    );
}
