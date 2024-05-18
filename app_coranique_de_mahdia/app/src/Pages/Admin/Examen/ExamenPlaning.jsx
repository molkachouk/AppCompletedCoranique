import { Box } from '@mui/material';
import React from 'react';
import { columns, rows } from './data';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Custom Arabic toolbar components


export default function ExamenPlaning() {
  return (
    <div>
      <Box sx={{ height: '600px', width: '80%', mx: 'auto' }}>
        <DataGrid
          slots={{
            toolbar: GridToolbar, // Use the custom Arabic toolbar
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </div>
  );
}
