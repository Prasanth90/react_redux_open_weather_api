import {blue, grey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const white = '#fff'

export const darkKnight = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#282828',
        '&$disabled': {
          backgroundColor: '#303032',
          color: white,
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
        fontWeight: 300,
      },
    },
  },
  props: {
    MuiInput: {
      autoComplete: 'off',
    },
    MuiInputLabel: {
      shrink: true,
    },
    MuiTextField: {
      autoComplete: 'off',
      variant: 'filled',
    }
  },
  palette: {
    background: {
      default: '#333335',
      paper: '#2f2f2f',
    },
    primary: {
      main: blue[200],
    },
    secondary: {
      main: grey[900],
    },
    type: 'dark',
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    h5: {
      fontSize: '1.3rem',
      textAlign: "center"
    },
    h3: {
      textAlign: "center"
    },
    h1: {
      fontSize: '6rem'
    },
    htmlFontSize: 16,
  },
})
