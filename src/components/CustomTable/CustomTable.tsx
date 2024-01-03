import { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

const CustomTable: FC<DataGridProps> = ({ ...rest }): ReactElement => {
  return (
    <Box sx={{ pt: 12, width: '100%' }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        disableColumnMenu
        {...rest}
      />
    </Box>
  );
};

export { CustomTable };
