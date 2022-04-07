import { createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography: {
        useNextVariant: true,
    },
    palette: {
        primary: {
            light: '#d1d1d1',
            main: '#3f4771',
            dark: '#2e355b',
            contrastText: '#000'
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#fff'
        },
        openTitle: '#3f4771',
        protectedTitle: pink[400],
        type: 'light',
        error: {
            main: red[500]
        }
    }
});

export default theme;