/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react';
import { SxProps, Theme } from '@mui/material';
import { TooltipPlacement } from '../enums';

export interface ITooltipProps {
  title: string;
  children: ReactElement<any, any>;
  placement?: TooltipPlacement;
  arrow?: boolean;
  sx?: SxProps<Theme>;
}
