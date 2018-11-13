import { createMuiTheme } from '@material-ui/core/styles'

const searchBar = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiFormControl: {
            root: {
                background: 'white',
                borderRadius: '5px',
                padding: '4px 8px'
            }
        }
    }
})

export default searchBar
