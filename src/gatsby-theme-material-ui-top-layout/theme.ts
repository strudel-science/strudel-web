import { Theme, createTheme } from "@mui/material";

/**
 * Material UI custom theme object.
 * This is where the color palette and default 
 * component styles and props can be defined.
 */
const theme: Theme = createTheme({
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
        main: '#0143CF'
      },
      warning: {
        main: '#D6B5FF'
      },
      error: {
        main: '#FF4D4D'
      },
      neutral: {
        main: '#E7E4F1',
        light: '#F5F4F9',
        dark: '#675E73'
      }
    },
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      // MuiToolbar: {
      //   styleOverrides: {
      //     regular: {
      //       '@media (min-width: 0px)': {
      //         paddingLeft: 0,
      //         paddingRight: 0
      //       }
      //     }
      //   }
      // }
    },
});

export default theme;