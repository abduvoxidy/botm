import React from 'react';
import { FormHelperText, TextareaAutosize, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledTextareaAutosize = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    min-height: 150px;
    overflow-y: scroll;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

export default function HFTextArea({
  control,
  name = '',
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{ required: required ? 'This is a required field' : false, ...rules }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <StyledTextareaAutosize
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={name}
              placeholder="Description..."
              error={!!error}
              {...props}
            />
            {!disabledHelperText && (
              <FormHelperText error>{error?.message ?? ' '}</FormHelperText>
            )}
          </>
        )}
      />
    </div>
  );
}
