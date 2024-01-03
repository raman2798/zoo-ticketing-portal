import { lazy } from 'react';
import { IRoute } from './interfaces';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const Ticket = lazy(() => import('@/pages/tickets'));
const TicketForm = lazy(() => import('@/pages/tickets/ticketForm'));
const TicketVerify = lazy(() => import('@/pages/ticketVerify'));
const TicketVerificationForm = lazy(() => import('@/pages/ticketVerify/ticketVerificationForm'));

const authRoutes: IRoute[] = [
  {
    key: 'dashboard',
    path: '/',
    component: Dashboard,
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    key: 'tickets',
    path: '/tickets',
    children: [
      {
        key: 'counters',
        path: '/counters',
        component: Ticket,
        children: [
          {
            key: 'counter-form',
            path: '/form',
            component: TicketForm,
          },
        ],
      },
      {
        key: 'verify',
        path: '/verify',
        component: TicketVerify,
        children: [
          {
            key: 'verify-form',
            path: '/form',
            component: TicketVerificationForm,
          },
        ],
      },
    ],
  },
];

export { authRoutes };
