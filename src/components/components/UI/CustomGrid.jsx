import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  fontFamily: 'inherit',
  backgroundColor: '#fff',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#212121',
    fontWeight: 600,
    fontSize: '1rem',
  },

  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },

  '& .MuiDataGrid-cell': {
    fontSize: '0.95rem',
    borderBottom: '1px solid #e0e0e0',
    padding: '12px 8px',
  },

  '& .MuiDataGrid-row': {
    minHeight: 44,
    maxHeight: 44,
  },

  '& .MuiDataGrid-row:hover': {
    backgroundColor: '#f9fafb',
  },

  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
  },
}));

const CustomGrid = ({
  rows,
  columns,
  pageSize = 10,
  checkboxSelection = false,
  disableSelectionOnClick = true,
  height = 500,
  ...props
}) => {
  return (
    <Box sx={{ height: height, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        sortingOrder={['asc', 'desc']}
        components={{ Toolbar: GridToolbar }}
        {...props}
      />
    </Box>
  );
};

export default CustomGrid;
