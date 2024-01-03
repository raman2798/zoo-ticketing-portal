import { FC, ReactElement } from 'react';
import { Box } from '@mui/material';

const Dashboard: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80vh',
      }}
    >
      <h3>Welcome to Zoo</h3>
    </Box>
  );
};

export default Dashboard;
