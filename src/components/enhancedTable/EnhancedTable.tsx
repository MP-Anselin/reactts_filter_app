import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SearchBar from "material-ui-search-bar";

import {getComparator, stableSort, Order, floatTwoNb} from "../../utils";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {IAccountList, IAccountDataTable} from "../../interfaces";
import StringField from "../rowDetails/StringField";

const EnhancedTable: React.FC<IAccountList> = ({
                                                   accountList
                                               }) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IAccountDataTable>('Code');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [gatheredAccountList, setGatheredAccountList] = useState<IAccountDataTable[]>([]);
    const [searched, setSearched] = useState<string>("");
    const [rowsList, setRowsList] = useState<IAccountDataTable[]>([]);

    useEffect(() => {
        setGatheredAccountList(accountList);
    }, [accountList])

    useEffect(() => {
        setRowsList(gatheredAccountList);
    }, [gatheredAccountList])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IAccountDataTable,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rowsList.map((n) => n.Code);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = gatheredAccountList.filter((row) => {
            return row.Code.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRowsList(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsList.length) : 0;

    return (
        <div className="enhancedCenter">
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar
                        gatheredAccountList={rowsList}
                        selectedList={selected}
                        setGatheredAccountList={setGatheredAccountList}
                    />
                    <SearchBar
                        className="enhancedSearch"
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rowsList.length}
                            />
                            <TableBody>
                                {stableSort(rowsList, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: IAccountDataTable, index: number) => {
                                        const isItemSelected = isSelected(row.Code);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.Code)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.Code}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.Code}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StringField key={"StringField Providers" + index}
                                                                 providers={row.Providers}/>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StringField key={"StringField Medias" + index}
                                                                 providers={row.Medias}/>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StringField providers={row.Parameters}/>
                                                </TableCell>
                                                <TableCell align="right">{floatTwoNb(row.Measure)}</TableCell>
                                                <TableCell align="right">{floatTwoNb(row.LawlimitEC.avg)}</TableCell>
                                                <TableCell align="right">{floatTwoNb(row.LawlimitWHO.avg)}</TableCell>
                                                <TableCell align="right">{floatTwoNb(row.EQsEC.avg)}</TableCell>
                                                <TableCell align="right">{floatTwoNb(row.EQsWHO.avg)}</TableCell>
                                                <TableCell align="right">{floatTwoNb(row.NbrAccount)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        className={"enhancedColor"}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rowsList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}

export default EnhancedTable;
