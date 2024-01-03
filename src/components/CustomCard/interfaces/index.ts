import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

export interface ICardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export interface ICollapseCardProps {
  cardTitle: string;
  isAdd: boolean;
  addNewCard: () => void;
  isDelete: boolean;
  deleteCard: (index: number) => void;
  index: number;
  tooltipTitle: string;
  tooltipDisabled?: boolean;
  sx?: SxProps<Theme>;
  children: ReactNode;
}
