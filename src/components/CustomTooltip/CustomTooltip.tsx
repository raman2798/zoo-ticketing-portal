import { FC, ReactElement } from 'react';
import { Tooltip } from '@mui/material';
import { TooltipPlacement } from './enums';
import { ITooltipProps } from './interfaces';

const CustomTooltip: FC<ITooltipProps> = ({ title, placement, children, ...rest }): ReactElement => {
  return (
    <Tooltip title={title} placement={placement || TooltipPlacement.BOTTOM} arrow {...rest}>
      {children}
    </Tooltip>
  );
};

export { CustomTooltip };
