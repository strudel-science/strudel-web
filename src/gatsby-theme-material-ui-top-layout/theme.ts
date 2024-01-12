import { Theme, createTheme } from "@mui/material";

/**
 * Material UI custom theme object.
 * This is where the color palette and other default
 * static theme values are defined.
 * 
 * This gets passed into `theme` to create the final theme object.
 * This is done so that component themes have access to globalTheme values.
 */
const globalTheme: Theme = createTheme({
    palette: {
      primary: {
        main: '#0143CF',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#D6B5FF'
      },
      info: {
        main: '#180333'
      },
      success: {
        main: '#C8E6C9'
      },
      warning: {
        main: '#FFE0B2'
      },
      error: {
        main: '#FF4D4D'
      },
      neutral: {
        main: '#E7E4F1',
        light: '#F5F4F9',
        dark: '#675E73'
      }
    }
});

/**
 * Using the globalTheme, set default component styles and props
 */
const theme: Theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            '&.Mui-disabled.MuiButton-contained': {
              backgroundColor: globalTheme.palette.neutral?.light,
              color: globalTheme.palette.neutral?.dark,
              cursor: 'not-allowed',
              opacity: 0.6,
              pointerEvents: 'all',
            }
          }
        }
      },
    },
}, globalTheme);

export default theme;