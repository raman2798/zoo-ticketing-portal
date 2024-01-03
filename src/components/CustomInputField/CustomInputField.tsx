/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { ChangeEvent, FC, ReactElement, useState } from 'react';
import dayjs from 'dayjs';
import { Box, Typography, TextField, MenuItem, Checkbox, InputAdornment, Grid, Autocomplete, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isEqual, includes, get, map } from 'lodash';
import { Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomIconButton } from '../CustomButton';
import { ICustomInputFieldProps, IField } from './interfaces';
import { InputFieldType, Margin, Variant } from './enums';

const CustomInputField: FC<ICustomInputFieldProps> = ({ fields, onChange }): ReactElement => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleErrors = (key: string, helperText: string, isError: boolean) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { helperText, error: isError },
    }));
  };

  const handleChange = (key: string, required: boolean, inputValue: string, type?: string) => {
    let errorMessage;
    let valueIncludes;
    let value = inputValue;

    const isDate = isEqual(type, InputFieldType.DATE);
    const isTel = isEqual(type, InputFieldType.TEL);
    const isEmail = isEqual(type, InputFieldType.EMAIL);

    if (isDate) {
      if (typeof inputValue === 'string' && dayjs(inputValue).isValid()) {
        value = dayjs(inputValue).format('YYYY-MM-DD');
      } else {
        value = 'Invalid Date';
      }

      const currentDate = dayjs();

      if (typeof value === 'string' && dayjs(value).isAfter(currentDate)) {
        value = 'Invalid Date';
      }

      valueIncludes = includes(['Invalid Date'], value);

      value = valueIncludes ? '' : value;

      errorMessage = 'Invalid Date';
    }

    if (isTel) {
      const mobileRegex = /^\+1 \d{3}-\d{3}-\d{4}$/;

      value = inputValue ? String(inputValue) : '';

      valueIncludes = value && !mobileRegex.test(value);

      errorMessage = value && 'Invalid Phone';
    }

    if (isEmail) {
      const emailRegex = /^\w+([\.-]?\w+)*(\+?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      value = inputValue ? String(inputValue) : '';

      valueIncludes = value && !value.match(emailRegex);

      errorMessage = value && 'Invalid email address';
    }

    const isError = required && (valueIncludes || !value);

    const errorText = isError ? errorMessage || 'Required' : '';

    handleErrors(key, errorText, isError);

    if (isDate || isTel || isEmail || !valueIncludes) {
      onChange(key, value, isError);
    }
  };

  const renderInputField = (key: string, field: IField) => {
    const {
      type,
      required = false,
      placeholder,
      value,
      label,
      style,
      options,
      format,
      past,
      future,
      views,
      disabled = false,
      variant = Variant.OUTLINED,
      fullWidth = true,
      margin = Margin.NORMAL,
      helperText,
      error,
    } = field;

    const commonProps = {
      required,
      variant,
      fullWidth,
      margin,
      disabled,
      label,
      placeholder,
      style: { ...style },
      helperText: helperText || get(errors, `${key}.helperText`, ''),
      error: error || get(errors, `${key}.error`, false),
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => handleChange(key, required, get(event, 'target.value'), type),
    };

    switch (type) {
      case InputFieldType.NUMBER:
        return <TextField {...commonProps} type="number" InputProps={{ inputProps: { min: 0 } }} />;
      case InputFieldType.PASSWORD:
        return (
          <TextField
            {...commonProps}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CustomIconButton arialabel="Toggle password visibility" disabled={disabled} onClick={handleShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </CustomIconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      case InputFieldType.SEARCH:
        return (
          <Autocomplete
            disableClearable
            options={options || []}
            renderInput={(params) => (
              <TextField
                {...params}
                {...commonProps}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        );
      case InputFieldType.TEXTAREA:
        return <TextField {...commonProps} type="text" multiline minRows={2} maxRows={10} />;
      case InputFieldType.TEL: {
        const newValue = value ? String(value).substring(3) : value;

        return (
          <TextField
            {...commonProps}
            type="tel"
            value={newValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ display: 'flex', alignItems: 'center' }}>
                  <span role="img" aria-label="US Flag" style={{ fontSize: '1.2em', marginRight: '8px' }}>
                    🇺🇸
                  </span>{' '}
                  +1
                </InputAdornment>
              ),
            }}
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              // Remove non-digit characters
              const numericValue = get(event, 'target.value').replace(/[^\d]/g, '');

              // Format the phone number as XXX-XXX-XXXX
              let formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;

              // Find the index of the character in the string
              let charIndex = formattedValue.endsWith('-');

              while (charIndex) {
                formattedValue = formattedValue.substring(0, formattedValue.length - 1);

                charIndex = formattedValue.endsWith('-');
              }

              // Set the formatted value to the input
              event.target.value = formattedValue;
            }}
            onChange={(event) => {
              let inputValue = get(event, 'target.value');

              if (inputValue) {
                inputValue = `+1 ${get(event, 'target.value')}`;
              }

              handleChange(key, required, inputValue, InputFieldType.TEL);
            }}
          />
        );
      }
      case InputFieldType.DATE:
        return (
          <LocalizationProvider key={key} dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={value && typeof value === 'string' ? dayjs(value) : null}
              disablePast={past}
              disableFuture={future}
              format={format}
              views={views}
              slotProps={{
                textField: {
                  required,
                  helperText: get(errors, `${key}.helperText`, ''),
                  error: get(errors, `${key}.error`, false),
                  sx: { ...commonProps.style },
                },
              }}
              onChange={(newValue) => {
                if (newValue) {
                  handleChange(key, required, newValue.toString(), InputFieldType.DATE);
                }
              }}
            />
          </LocalizationProvider>
        );
      case InputFieldType.SELECT:
        return (
          <TextField {...commonProps} select>
            {map(options, (option) => (
              <MenuItem key={get(option, 'value')} value={get(option, 'value')}>
                {get(option, 'label')}
              </MenuItem>
            ))}
          </TextField>
        );
      case InputFieldType.CHECKBOX:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={isEqual(value, 'true')} onChange={(event) => handleChange(key, required, String(get(event, 'target.checked')))} inputProps={{ 'aria-label': 'controlled' }} />
              <Typography>{label}</Typography>
            </Box>
          </Box>
        );
      case InputFieldType.RADIO:
        return (
          <FormControl sx={{ ml: 1 }} error={get(errors, `${key}.error`, false)} variant="standard">
            <FormLabel>
              {label}
              {required && <span style={{ marginLeft: '4px' }}>*</span>}
            </FormLabel>
            <RadioGroup row value={value} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(key, required, get(event, 'target.value'), type)}>
              {map(options, (item, itemKey) => (
                <FormControlLabel key={itemKey} value={item.value} control={<Radio />} label={item.label} />
              ))}
            </RadioGroup>
            <FormHelperText>{get(errors, `${key}.helperText`, '')}</FormHelperText>
          </FormControl>
        );
      default:
        return <TextField {...commonProps} type={type} />;
    }
  };

  return (
    <>
      {map(fields, (field, key) => {
        const { isDisplay = true } = field;

        return (
          isDisplay && (
            <Grid item xs={12} sm={6} key={key}>
              {renderInputField(key, field)}
            </Grid>
          )
        );
      })}
    </>
  );
};

export { CustomInputField };
