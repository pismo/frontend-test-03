import { createMuiTheme } from '@material-ui/core/styles'

const cardStyle = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiCard: {
            root: {
                width: '100%'
            }
        },
        MuiCardMedia: {
            root: {
                objectFit: 'cover',
                objectPosition: '50% 100%'
            }
        }
    }
})

export default cardStyle
