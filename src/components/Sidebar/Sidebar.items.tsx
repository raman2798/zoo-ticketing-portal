import { ConfirmationNumber, HomeOutlined, LocalActivity, VerifiedUser } from '@mui/icons-material';
import { ISidebarItem } from './interfaces';

export const sidebarItems: ISidebarItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <HomeOutlined /> },
  {
    title: 'Ticket',
    path: '/tickets',
    icon: <LocalActivity />,
    subMenu: [
      { title: 'Generate', path: '/counters', icon: <ConfirmationNumber /> },
      { title: 'Verify', path: '/verify', icon: <VerifiedUser /> },
    ],
  },
];
