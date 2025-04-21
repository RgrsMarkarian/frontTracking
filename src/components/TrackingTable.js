import React from 'react';

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



function TrackingTable({records,setRecordSelected}){

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //  const [recordSelected,setRecordSelected] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

 

    return (
        <Paper sx={{ width: '100%' }}>
        <TableContainer component={Paper}>

            <Table sx={{minWidth: 650}} size='small' aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Device</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Latitud</TableCell>
                        <TableCell>Longitud</TableCell>
                        <TableCell>Up</TableCell>
                        <TableCell>Down</TableCell>
                        <TableCell>Signal</TableCell>
                        <TableCell>Power</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((record) =>
                    <TableRow

                        onClick={() => setRecordSelected(record)}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } ,cursor: 'pointer' }}
                    >
                        <TableCell component="th" scope="row">
                            {record.device}
                        </TableCell>
                        <TableCell align='left'>{record.created_at}</TableCell>
                        <TableCell align='left'>{record.latitud}</TableCell>
                        <TableCell align='left'>{record.longitud}</TableCell>
                        <TableCell align='left'>{record.up}</TableCell>
                        <TableCell align='left'>{record.down}</TableCell>
                        <TableCell align='left'>{record.signal}</TableCell>
                        <TableCell align='left'>{record.power}</TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Paper>
    );

}


export default TrackingTable;