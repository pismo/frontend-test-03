// @flow
import React, { Component, Suspense, Fragment } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { ContainerCards } from '../styles'
import { createFilter } from 'react-search-input'
const SearchBar = React.lazy(() => import('../components/SearchBar'))
const Card = React.lazy(() => import('../components/Card'))
const Typography = React.lazy(() => import('@material-ui/core/Typography'))

type State = {
    searchTerm: string,
    isActive: boolean
}

class Favorite extends Component<{}, State> {
    state = {
        searchTerm: '',
        isActive: true
    }

    data: Object | string = null
    dataArr: Array<Object> = null

    constructor (props) {
        super(props)

        this.data = localStorage.getItem('favoriteList')

        if (this.data) {
            this.data = JSON.parse(this.data)

            if (Object.keys(this.data).length === 0) {
                this.data = null
                return
            }

            this.dataArr = Object.keys(this.data).map(el => this.data[el])
        }
    }

    componentDidMount () {
        if (!this.data) {
            this.setState({ isActive: false })
        }
    }

    searchUpdate = (term: string): Promise => {
        return new Promise((resolve) => {
            this.setState({ searchTerm: term }, resolve)
        })
    }

    render () {
        let { isActive, searchTerm } = this.state
        let filter: Array<Object> = []

        if (!isActive) {
            return (
                <Fragment>
                    <ErrorBoundary>
                        <Suspense fallback={<div></div>}>
                            <SearchBar searchUpdate={this.searchUpdate} isActive={isActive} />
                            <ContainerCards
                                width={1}
                                style={{ height: '100%', justifyContent: 'center' }}
                            >
                                <Typography variant='h4' style={{ color: 'white' }}>Não há itens para exibir</Typography>
                            </ContainerCards>
                        </Suspense>
                    </ErrorBoundary>
                </Fragment>
            )
        }

        if (this.data) filter = this.dataArr.filter(createFilter(searchTerm, ['title']))

        return (
            <Fragment>
                <ErrorBoundary>
                    <Suspense fallback={<div></div>}>
                        <SearchBar searchUpdate={this.searchUpdate} />
                        <ContainerCards
                            width={1}
                        >
                            { this.data ? filter.map(el => <Card key={el.id} data={el} />) : null }
                        </ContainerCards>
                    </Suspense>
                </ErrorBoundary>
            </Fragment>
        )
    }
}

export default Favorite
