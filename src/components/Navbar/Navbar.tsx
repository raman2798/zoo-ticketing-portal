import { FC, ReactElement } from 'react';
import { Toolbar, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { CustomIconButton } from '../CustomButton';
import { INavbarProps } from './interfaces';

const Navbar: FC<INavbarProps> = ({ onToggle }): ReactElement => {
  const mnuNavbarHeight = document.getElementById('sidebarMnuHeader')?.clientHeight;

  return (
    <Box
      sx={{
        width: '100%',
        height: mnuNavbarHeight,
        boxShadow: 2,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomIconButton arialabel="menu" onClick={onToggle}>
          <MenuIcon sx={{ color: (theme) => theme.palette.secondary.main, '&:focus': { outline: 'none' }, '&:hover': {} }} />
        </CustomIconButton>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </Box>
  );
};

export { Navbar };
