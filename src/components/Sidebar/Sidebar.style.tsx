import { Box, styled } from '@mui/material';

export const StyledLogo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  margin-top: 26px;
  margin-bottom: 26px;
`;

export const StyledName = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 20px;
`;
