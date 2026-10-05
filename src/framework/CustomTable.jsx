import React from "react";
import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

const CustomTable = ({
  columns = [],
  data = [],

  loading = false,
  emptyMessage = "No records found",
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
  selectable = false,
  selectedRows = [],
  onSelectionChange,

  getRowId = (row) => row._id || row.id,

  stickyHeader = true,
  minWidth = 900,

  onRowClick,
}) => {
  const handleSelectRow = (row) => {
    const rowId = getRowId(row);

    const isSelected = selectedRows.includes(rowId);

    if (isSelected) {
      onSelectionChange?.(selectedRows.filter((id) => id !== rowId));
    } else {
      onSelectionChange?.([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = data.map((row) => getRowId(row));

      onSelectionChange?.(allIds);
    } else {
      onSelectionChange?.([]);
    }
  };

  const renderCell = (column, row) => {
    const value = row[column.field];

    if (column.render) {
      return column.render(value, row);
    }

    if (value === null || value === undefined || value === "") {
      return "—";
    }

    return value;
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const someSelected =
    selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "#D0D5DD",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 650,
          //   backgroundColor: "red",
        }}
      >
        <Table
          stickyHeader={stickyHeader}
          sx={{
            minWidth,
          }}
        >
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    backgroundColor: "background.paper",
                  }}
                >
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || "left"}
                  sx={{
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    backgroundColor: "background.paper",

                    width: column.width,
                    minWidth: column.minWidth,

                    textTransform: "none",
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{
                      py: 8,
                    }}
                  >
                    <CircularProgress size={30} />

                    <Typography variant="body2" color="text.secondary">
                      Loading...
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      py: 8,
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {emptyMessage}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      There is nothing to display here.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              data.map((row, rowIndex) => {
                const rowId = getRowId(row);

                const isSelected = selectedRows.includes(rowId);

                return (
                  <TableRow
                    key={rowId || rowIndex}
                    hover
                    selected={isSelected}
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? "pointer" : "default",

                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(row)}
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align || "left"}
                        sx={{
                          whiteSpace: column.nowrap ? "nowrap" : "normal",

                          py: 1.8,
                        }}
                      >
                        {renderCell(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
};

export default CustomTable;
