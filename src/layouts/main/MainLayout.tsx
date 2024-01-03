import { FC, ReactElement, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Footer, Navbar, SideBar } from '@/components';
import { IMainLayoutProps } from './interface';

const MainLayout: FC<IMainLayoutProps> = ({ children }): ReactElement => {
  const theme = useTheme();

  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const menuHeaderHeight = document.getElementById('sidebarMnuHeader')?.clientHeight;

  const footerHeight = document.getElementById('footer')?.clientHeight;

  const height: string = `calc(100% - ${(menuHeaderHeight || 0 + (footerHeight || 0)).toString()})`;

  const onToggle = () => {
    setIsToggled(!isToggled);

    if (isSmallDevice) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '100vh',
        maxWidth: '100vw',
        flexGrow: 1,
      }}
    >
      <SideBar isCollapsed={isCollapsed} isToggled={isToggled} onToggle={onToggle} />
      <Box
        id="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          minHeight: '100vh',
          maxWidth: '100vw',
          flexGrow: 1,
        }}
      >
        <Navbar onToggle={onToggle} />
        <Box
          sx={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflowY: 'auto',
            flexGrow: 1,
            pt: 4,
            pb: 8,
            pl: isSmallDevice ? 5 : 8,
            pr: isSmallDevice ? 5 : 8,
            minHeight: height,
            maxWidth: '100vw',
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export { MainLayout };
