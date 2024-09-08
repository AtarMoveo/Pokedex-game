import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, CircularProgress
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Pokemon } from '../../../data/types/pokemon';
import { getColumnPadding, tableStyles } from './styles';
import { colors, font, textStyle } from '../../../assets/style/setup/constants';
import pokeBallImg from '../../../assets/img/pokeball.webp'

interface Column {
  id: string
  label: string
  minWidth?: number
  maxWidth?: number
  align?: 'right' | 'left' | 'center'
}

interface GenericTableProps {
  columns: Column[]
  rows: Pokemon[]
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  loading: boolean
  totalRows: number
  rowsPerPage: number
  page: number
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon | null>>
  userPokemonsIds?: number[]
}

const GenericTable = ({
  columns, rows, setPage, setRowsPerPage, loading, totalRows, rowsPerPage,
  page, setSelectedPokemon, userPokemonsIds
}: GenericTableProps) => {

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const renderTableCell = (column: Column, row: Pokemon, value: any) => {
    if (column.id === 'thumbnail') {
      return (<div style={{ position: 'relative', width: '3.375rem', height: '3.375rem' }}>
        <img
          src={value}
          alt={column.label}
          style={tableStyles.imageCell}
        />
        {userPokemonsIds && userPokemonsIds.includes(row.id) &&
          <img style={{ position: 'absolute', height: 15, bottom: 0, right: 0 }}
            src={pokeBallImg} />}
      </div>
      )
    }
    if (column.id === 'id') {
      return `#${value.toString().padStart(4, '0')}`
    }
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0} >
      <TableContainer >
        <Table stickyHeader aria-label="sticky table" data-cy="pokemon-table">
          <TableHead>
            <TableRow sx={tableStyles.headRow}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={tableStyles.headCell}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>}
            {!loading && rows.length === 0 ?
              <TableRow><TableCell colSpan={columns.length} align="center" height="260px"
                sx={{
                  fontFamily: font.primary.regular,
                  ...textStyle.mediumHeading,
                  color: colors.neutrals[350]
                }}
              >
                No Pokemons exist
              </TableCell></TableRow> : (
                rows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                    onClick={() => setSelectedPokemon(row)}
                    sx={{ ...tableStyles.bodyRow }}
                    data-cy={`pokemon-row-${row.name}`}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ maxWidth: column.maxWidth, width: column.id === 'thumbnail' ? '80px' : '' }}
                        sx={{
                          ...tableStyles.bodyCell,
                          padding: getColumnPadding(column.id),
                          ...(column.id === 'name' && tableStyles.nameCell),

                        }}
                        data-cy={`pokemon-cell-${column.id}-${row.id}`}
                      >
                        {renderTableCell(column, row, (row as any)[column.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={tableStyles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} items`}
      />
    </Paper>
  )
}

export default GenericTable