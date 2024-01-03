import { FC, ReactElement } from 'react';
import { Box, Divider } from '@mui/material';
import { StyledFooterBody, StyledFooterContainer, StyledRightsReserved } from './Footer.style';

const Footer: FC = (): ReactElement => {
  return (
    <>
      <Divider />
      <StyledFooterContainer id="footer">
        <StyledFooterBody>
          <StyledRightsReserved>
            <Box>Zoo</Box>
          </StyledRightsReserved>
        </StyledFooterBody>
      </StyledFooterContainer>
    </>
  );
};

export { Footer };
