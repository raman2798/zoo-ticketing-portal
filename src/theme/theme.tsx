/* eslint-disable react-refresh/only-export-components */
import { createTheme } from '@mui/material';

export const COLORS = {
  WHITE: '#FFFFFF',
  VIOLET: '#6B34EB',
  LIGHT_GREEN: '#C6D43B',
  RED: '#FF0000',
  ORANGE: '#fd964b',
  YELLOW: '#FF9800',
  GREEN: '#009400',
  DARK_GREEN: '#027148',
  BLACK: '#1e1e1e',
  GREY: '#CCCCCA',
  LIGHT_GREY: '#EEEEEE',
  LIGHT_GREY_1: '#D3D3D3',
  BLUE: '#070945',
};

// Define font styles to be used throughout the app
export const FONT = {
  // Define available font-families to be used throughout the app
  FAMILY: ['Arial'].join(','),
  LINE_HEIGHT: {
    HEADER: '110%',
    BODY: '140%',
  },
  // Define font weights that would be used throughout the app
  WEIGHT: {
    LIGHT: 300,
    REGULAR: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
  },
  SIZES: {
    36: '2.25rem',
    28: '1.75rem',
    24: '1.5rem',
    20: '1.25rem',
    16: '1rem',
    14: '0.875rem',
    12: '0.75rem',
  },
};

/**
 * UX spacing defaults to 4px (converted to rem)
 * Please do not export. Use "theme.spacing(1)" instead
 */
const SPACE_UNIT_IN_REM = 0.25;

/**
 * Base theme allows us to make use of options that are provided by default MUI
 * and custom spacing and breakpoints declaration below
 */
const baseTheme = createTheme({
  spacing: (factor: number) => `${SPACE_UNIT_IN_REM * factor}rem`,
});

// Theme used throughout the app
export const zooTheme = createTheme({
  ...baseTheme,
  palette: {
    primary: {
      main: COLORS.BLUE,
    },
    secondary: {
      main: COLORS.WHITE,
    },
    error: {
      main: COLORS.RED,
    },
    warning: {
      main: COLORS.YELLOW,
    },
    success: {
      main: COLORS.GREEN,
    },
  },
  typography: {
    fontFamily: FONT.FAMILY,
    h1: {
      fontSize: FONT.SIZES[36],
      lineHeight: FONT.LINE_HEIGHT.HEADER,
      fontWeight: FONT.WEIGHT.BOLD,
    },
    h2: {
      fontSize: FONT.SIZES[28],
      lineHeight: FONT.LINE_HEIGHT.HEADER,
      fontWeight: FONT.WEIGHT.BOLD,
    },
    h3: {
      fontSize: FONT.SIZES[20],
      lineHeight: FONT.LINE_HEIGHT.HEADER,
      fontWeight: FONT.WEIGHT.BOLD,
    },
    h4: {
      fontSize: FONT.SIZES[20],
      lineHeight: FONT.LINE_HEIGHT.HEADER,
      fontWeight: FONT.WEIGHT.SEMIBOLD,
    },
    h5: {
      fontSize: FONT.SIZES[16],
      lineHeight: FONT.LINE_HEIGHT.HEADER,
      fontWeight: FONT.WEIGHT.BOLD,
    },
    subtitle1: {
      fontSize: FONT.SIZES[14],
      fontWeight: FONT.WEIGHT.REGULAR,
    },
    body1: {
      fontSize: FONT.SIZES[16],
      lineHeight: FONT.LINE_HEIGHT.BODY,
      fontWeight: FONT.WEIGHT.MEDIUM,
    },
    body2: {
      fontSize: FONT.SIZES[14],
      lineHeight: FONT.LINE_HEIGHT.BODY,
      fontWeight: FONT.WEIGHT.REGULAR,
    },
    caption: {
      fontSize: FONT.SIZES[12],
      fontWeight: FONT.WEIGHT.REGULAR,
    },
    button: {
      backgroundColor: COLORS.ORANGE,
      color: COLORS.ORANGE,
      textTransform: 'none',
      fontSize: FONT.SIZES[16],
      fontWeight: FONT.WEIGHT.SEMIBOLD,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.ORANGE,
          color: COLORS.WHITE,
          textTransform: 'none',
          fontSize: FONT.SIZES[16],
          fontWeight: FONT.WEIGHT.SEMIBOLD,
        },
      },
    },
  },
});
