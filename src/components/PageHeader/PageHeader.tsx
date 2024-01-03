import { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import { IPageHeaderProps } from './interfaces';

const PageHeader: FC<IPageHeaderProps> = ({ title }): ReactElement => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginRight: 2,
            cursor: 'pointer',
          }}
        >
          <ArrowBackIos />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export { PageHeader };
