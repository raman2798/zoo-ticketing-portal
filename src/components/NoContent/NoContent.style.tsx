import { Box, styled } from '@mui/material';
import { COLORS } from '@/theme';

const { LIGHT_GREY_1 } = COLORS;

export const CenteredEmptyContentWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(100vh - 79vh);
`;

export const EmptyContentWrapper = styled(Box)`
  width: 100%;
  text-align: center;

  p {
    color: ${LIGHT_GREY_1};
    margin-top: 7px;
  }

  img {
    width: 200px;
  }
`;
