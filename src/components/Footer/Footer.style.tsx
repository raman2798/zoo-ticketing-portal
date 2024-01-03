import { Box, styled } from '@mui/material';
import { COLORS } from '@/theme';

const { LIGHT_GREY } = COLORS;

export const StyledFooterBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  fontSize: theme.typography.body2.fontSize,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    fontSize: theme.typography.caption.fontSize,
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

export const StyledFooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  backgroundColor: LIGHT_GREY,
  justifyContent: 'space-around',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    height: '6%',
  },
}));

export const StyledRightsReserved = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));
