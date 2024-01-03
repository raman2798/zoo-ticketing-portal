import { FC, ReactElement, forwardRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, CircularProgress, Box, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { connect } from 'react-redux';
import { get, has, isEqual, toUpper } from 'lodash';
import { alertingCreators, Alert } from '@/redux';
import { StyledLoader } from './GlobalHandler.style';
import { SnackbarType } from './enums';
import { IAlertProps, ICustomSnackbarProps } from './interfaces';
import { COLORS } from '@/theme';

const { discardAlert } = alertingCreators;

const { LOADER } = Alert;

const { BLUE, WHITE } = COLORS;

const CustomAlert = forwardRef<HTMLDivElement, AlertProps>((props, ref): ReactElement => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar: FC<ICustomSnackbarProps> = ({ isOpen, message, type, handleClose }): ReactElement => {
  const backgroundColor = isEqual(type, 'success') ? BLUE : 'default';
  const textColor = isEqual(type, 'success') ? WHITE : 'default';

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <CustomAlert onClose={handleClose} severity={type} sx={{ width: '100%', backgroundColor, color: textColor }}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
};

const CustomGlobals: FC<IAlertProps> = ({ isOpen, message, type, navigateLink, navigateState, discardAlert }) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (link: string, state?: object) => {
      navigate(link, {
        state: state || {},
      });

      discardAlert();
    },
    [navigate, discardAlert],
  );

  const handleClose = useCallback(
    (_: Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      if (navigateLink) {
        handleNavigate(navigateLink, navigateState);
      }

      discardAlert();
    },
    [navigateLink, handleNavigate, discardAlert],
  );

  useEffect(() => {
    if (type && navigateLink) {
      if (message) {
        setTimeout(() => {
          navigate(navigateLink, {
            state: navigateState,
          });
        }, 1000);
      } else {
        handleNavigate(navigateLink, navigateState);
      }
    }
  }, [navigateLink, navigate, handleNavigate, message, type]);

  const typeExists = has(SnackbarType, toUpper(type));

  const alertType = SnackbarType[toUpper(type) as keyof typeof SnackbarType];

  if (isOpen && type) {
    if (isEqual(type, LOADER)) {
      return (
        <StyledLoader>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress
              sx={{
                color: (theme) => theme.palette.primary.main,
                marginBottom: '16px',
              }}
            />
            <Typography variant="h6" color="white">
              {message || 'Please wait...'}
            </Typography>
          </Box>
        </StyledLoader>
      );
    }

    if (typeExists) {
      return <CustomSnackbar isOpen={isOpen} message={message} type={alertType} handleClose={handleClose} />;
    }
  }

  return null;
};

const mapStateToProps = (state: { alert: IAlertProps }) => ({
  isOpen: get(state, 'alert.isOpen'),
  message: get(state, 'alert.message'),
  type: get(state, 'alert.type'),
  navigateLink: get(state, 'alert.navigateLink'),
  navigateState: get(state, 'alert.navigateState'),
});

const mapDispatchToProps = {
  discardAlert,
};

export const GlobalHandler = connect(mapStateToProps, mapDispatchToProps)(CustomGlobals);
