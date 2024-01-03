import { FC, ReactElement } from 'react';
import { Button, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CloudUpload } from '@mui/icons-material';
import { isEmpty } from 'lodash';
import { zooTheme } from '@/theme';
import { CustomTooltip } from '../CustomTooltip';
import { StyledVisuallyHiddenInput } from './CustomButton.style';
import { IButtonProps, IFileUploadButtonProps, IIconButtonProps, ILoadingButtonProps } from './interfaces';
import { ButtonLoadingPosition } from './enums';

const theme = zooTheme;

const CustomButton: FC<IButtonProps> = ({ buttonText, sx, icon, ...rest }): ReactElement => {
  return (
    <Button variant="contained" sx={{ display: 'flex', mt: 2, flexDirection: 'row', alignItems: 'center', ...sx }} {...rest}>
      {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
      <span>{buttonText}</span>
    </Button>
  );
};

const CustomIconButton: FC<IIconButtonProps> = ({ tooltip, arialabel, children, sx, hasTooltip = false, ...rest }): ReactElement => {
  const style = {
    color: 'black',
    '&:focus': { outline: 'none' },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    ...sx,
  };

  if (hasTooltip && !isEmpty(tooltip)) {
    return (
      <CustomTooltip {...tooltip}>
        <span>
          <IconButton aria-label={arialabel} sx={style} {...rest}>
            {children}
          </IconButton>
        </span>
      </CustomTooltip>
    );
  }

  return (
    <IconButton aria-label={arialabel} sx={style} {...rest}>
      {children}
    </IconButton>
  );
};

// Renamed the function to CustomFileUploadButton
const CustomFileUploadButton: FC<IFileUploadButtonProps> = ({ buttonText, sx, ...rest }): ReactElement => {
  return (
    <Button component="label" sx={{ display: 'flex', mt: 2, flexDirection: 'column', ...sx }} startIcon={<CloudUpload />} {...rest}>
      {buttonText}
      <StyledVisuallyHiddenInput type="file" />
    </Button>
  );
};

const CustomLoadingButton: FC<ILoadingButtonProps> = ({ buttonText, loading = false, loadingPosition = ButtonLoadingPosition.START, sx, ...rest }): ReactElement => {
  return (
    <LoadingButton loading={loading} loadingPosition={loadingPosition} variant="contained" sx={{ display: 'flex', mt: 2, flexDirection: 'column', ...sx }} {...rest}>
      <span>{buttonText}</span>
    </LoadingButton>
  );
};

export { CustomButton, CustomIconButton, CustomFileUploadButton, CustomLoadingButton };
