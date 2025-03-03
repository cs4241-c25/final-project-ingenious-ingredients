import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import {useSession} from "next-auth/react";
import {User} from "../../Classes/User";
import {GetUser} from "@/Get-Post Requests/User/getUser";
import {GetIngredientsByUser} from "@/Get-Post Requests/PantryIngredient/getIngredientsByUser";
import {PantryIngredient} from "../../Classes/PantryIngredient";




// if(user){
//     let storageName = user.username;
//     let description = user.aboutMe;
//     console.log(storageName, description);
// }
// console.log(storageName, description);





interface Data {
    id: number;
    name: string;
    amount: number;
    unitOfMeasure: string;
    buyDate: string;
    userName: string;
}

function createData(
    id: number,
    name: string,
    amount: number,
    unitOfMeasure: string,
    buyDate: string,
    userName: string,
): Data {
    return {
        id,
        name,
        amount,
        unitOfMeasure,
        buyDate,
        userName,
    };
}

let rows = [


];

let i = 0;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Item',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'unitOfMeasure',
        numeric: false,
        disablePadding: true,
        label: 'Unit',
    },
    {
        id: 'buyDate',
        numeric: false,
        disablePadding: true,
        label: 'Date Bought',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: true,
        label: 'Who Bought It',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {

    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    My Pantry
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
export default function IngredientsTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('buyDate');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState<Data[]>([]);
    // const [newIngredient, setNewIngredient] = React.useState({
    //     name: '',
    //     amount: 0,
    //     unitOfMeasure: '',
    //     buyDate: '',
    // });

    const {data: session} = useSession();

    // const [pi, setPantryIngredients] = React.useState<PantryIngredient[]>([]);

    /*const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNewIngredient((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleAddIngredient = async() => {
        const newPantryIngredient: PantryIngredient = {
            name: newIngredient.name,
            amount: newIngredient.amount,
            unitOfMeasure: newIngredient.unitOfMeasure,
            buyDate: newIngredient.buyDate,
            username: session?.user.name || '',
        };
        await addIngredientToDatabase(newPantryIngredient);

        setRows((prevRows) => [
            ...prevRows,
            createData(
                i++,
                newIngredient.name,
                newIngredient.amount,
                newIngredient.unitOfMeasure,
                newIngredient.buyDate,
                session?.user.name || ''
            ),
        ]);

        setNewIngredient({name:'', amount: 0, unitOfMeasure:'', buyDate:''});
    }*/

    React.useEffect(() => {
        async function fetchData() {

            if (session?.user.name) {
                const pantryIngredients: PantryIngredient[] = await GetIngredientsByUser(session.user.name);

                const newRows = pantryIngredients.map((ingredient) =>
                createData(
                    i++,
                    ingredient.name,
                    ingredient.amount,
                    ingredient.unitOfMeasure,
                    ingredient.buyDate,
                    ingredient.username
                )
                );
                setRows(newRows);
            }
        }
        fetchData();
    }, [session]);



    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={0} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover

                                        role="checkbox"

                                        tabIndex={-1}
                                        key={row.id}

                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="left">{row.unitOfMeasure}</TableCell>
                                        <TableCell align="left">{row.buyDate}</TableCell>
                                        <TableCell align="left">{row.userName}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}