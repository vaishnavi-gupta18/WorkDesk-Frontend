import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2d3b8c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
    },
    grey: {
        main: '#757575'
    },
    background: {
        paper: '#ffffff',
        default: '#eeeeee',
    }
  },
  typography: {
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
    },
    subtitle2: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.8rem',
    },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;