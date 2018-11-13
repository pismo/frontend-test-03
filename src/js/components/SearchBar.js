// @flow
import React, { Component, Suspense, Fragment } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Flex } from '@rebass/grid'
import { withRouter, Route } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import { searchBar } from '../styles'
const AppBar = React.lazy(() => import('@material-ui/core/AppBar'))
const Toolbar = React.lazy(() => import('@material-ui/core/Toolbar'))
const TextField = React.lazy(() => import('@material-ui/core/TextField'))
const InputAdornment = React.lazy(() => import('@material-ui/core/InputAdornment'))
const IconButon = React.lazy(() => import('@material-ui/core/IconButton'))
const Search = React.lazy(() => import('@material-ui/icons/Search'))
const Home = React.lazy(() => import('@material-ui/icons/Home'))
const Star = React.lazy(() => import('@material-ui/icons/Grade'))

type Props = {
    history?: Object,
    location?: Object,
    match?: Object,
    staticContext?: any,
    searchUpdate: Function,
    isActive?: boolean
}

type State = {
    search: string
}

class SearchBar extends Component<Props, State> {
    state: State = {
        search: ''
    }

    input: HTMLInputElement = null

    changeSearch = (e: SyntheticInputEvent) => {
        let { searchUpdate } = this.props

        this.setState({ search: e.target.value })
        searchUpdate(e.target.value).then(() => this.input.focus())
    }

    render () {
        let { history, isActive } = this.props
        return (
            <Fragment>
                <ErrorBoundary>
                    <Suspense fallback={<div></div>}>
                        <MuiThemeProvider theme={searchBar}>
                            <AppBar position='static'>
                                <Toolbar>
                                    <Flex width={1}>
                                        <Route
                                            path='/favorites'
                                            exact
                                            component={() => (
                                                <Flex>
                                                    <IconButon onClick={() => history.push('/')}>
                                                        <Home style={{ color: 'white' }} />
                                                    </IconButon>
                                                </Flex>
                                            )}
                                        />
                                        <Flex width={1 / 2} justifyContent='center' m='auto'>
                                            <Route
                                                path='/'
                                                exact
                                                component={() => (
                                                    <TextField
                                                        disabled={isActive === false ? true : false}
                                                        type='search'
                                                        placeholder='Search'
                                                        fullWidth
                                                        inputRef={el => { if (el) this.input = el }}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            endAdornment: (
                                                                <InputAdornment position='end'>
                                                                    <IconButon>
                                                                        <Search />
                                                                    </IconButon>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        value={this.state.search}
                                                        onChange={this.changeSearch}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path='/favorites'
                                                component={() => (
                                                    <TextField
                                                        disabled={isActive === false ? true : false}
                                                        type='search'
                                                        placeholder='Search'
                                                        fullWidth
                                                        inputRef={el => { if (el) this.input = el }}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            endAdornment: (
                                                                <InputAdornment position='end'>
                                                                    <IconButon>
                                                                        <Search />
                                                                    </IconButon>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        value={this.state.search}
                                                        onChange={this.changeSearch}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path='/details'
                                                component={() => (
                                                    <IconButon onClick={() => history.push('/')}>
                                                        <Home style={{ color: 'white' }} />
                                                    </IconButon>
                                                )}
                                            />
                                        </Flex>
                                        <Route
                                            path='/'
                                            exact
                                            component={() => (
                                                <Flex ml='auto'>
                                                    <IconButon onClick={() => history.push('/favorites')}>
                                                        <Star style={{ color: 'white' }} />
                                                    </IconButon>
                                                </Flex>
                                            )}
                                        />
                                    </Flex>
                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>
                    </Suspense>
                </ErrorBoundary>
            </Fragment>
        )
    }
}

export default withRouter(SearchBar)
