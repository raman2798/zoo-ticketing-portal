/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import { ButtonColor, ButtonLoadingPosition, ButtonSize, ButtonVariant } from '../enums';
import { TooltipPlacement } from '@/components/CustomTooltip/enums';

export interface IButtonProps {
  buttonText: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  sx?: SxProps<Theme>;
  size?: ButtonSize;
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  icon?: JSX.Element;
  onClick?: (...args: any) => void;
}

export interface IFileUploadButtonProps extends IButtonProps {
  component?: string;
}

export interface IIconButtonProps {
  tooltip?: ITooltipProps;
  hasTooltip?: boolean;
  arialabel: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  sx?: SxProps<Theme>;
  size?: ButtonSize;
  children?: ReactNode;
  fullWidth?: boolean;
  onClick?: (...args: any) => void;
}

export interface ITooltipProps {
  title: string;
  placement?: TooltipPlacement;
  arrow?: boolean;
  sx?: SxProps<Theme>;
}

export interface ILoadingButtonProps extends IButtonProps {
  loading?: boolean;
  loadingPosition?: ButtonLoadingPosition;
}
