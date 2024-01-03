import { FC, ReactElement, useState } from 'react';
import { Card, CardActions, Collapse, Typography, Box, CardContent } from '@mui/material';
import { AddCircleOutline, Delete, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { CustomIconButton, CustomButtonEnums } from '../CustomButton';
import { ICardProps, ICollapseCardProps } from './interfaces';

const { ButtonColor } = CustomButtonEnums;

const CustomCard: FC<ICardProps> = ({ children, ...rest }): ReactElement => {
  return (
    <Card {...rest}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const CustomCollapseCard: FC<ICollapseCardProps> = ({ cardTitle, isAdd, addNewCard, isDelete, deleteCard, index, tooltipTitle, tooltipDisabled = false, children, sx }): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ ...sx }}>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ margin: 'auto 0.5rem' }} title={cardTitle}>
            {cardTitle}
          </Typography>
        </Box>
        <Box>
          <CustomIconButton arialabel="arrow" onClick={handleExpand}>
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </CustomIconButton>
          {isAdd && (
            <CustomIconButton
              arialabel="add"
              disabled={tooltipDisabled}
              onClick={addNewCard}
              sx={{
                alignSelf: 'flex-end',
              }}
              hasTooltip
              tooltip={{ title: tooltipTitle }}
            >
              <AddCircleOutline />
            </CustomIconButton>
          )}

          {isDelete && (
            <CustomIconButton arialabel="delete" color={ButtonColor.ERROR} onClick={() => deleteCard(index)} hasTooltip tooltip={{ title: 'Delete Card' }}>
              <Delete />
            </CustomIconButton>
          )}
        </Box>
      </CardActions>

      <Collapse in={isExpanded}>
        <Box sx={{ margin: '1rem 2rem', justifyContent: 'space-between' }}>{children}</Box>
      </Collapse>
    </Card>
  );
};

export { CustomCard, CustomCollapseCard };
