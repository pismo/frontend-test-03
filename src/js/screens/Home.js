// @flow
import React, { Component, Suspense, Fragment } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { connect } from 'react-redux'
import type { MovieState, PopularList, Action } from '../redux/types'
import { addPopularList } from '../redux/actions/movie_action'
import { ContainerCards } from '../styles'
import { createFilter } from 'react-search-input'
const SearchBar = React.lazy(() => import('../components/SearchBar'))
const Card = React.lazy(() => import('../components/Card'))

type Props = {
    data: Object,
    movie: MovieState,
    addPopularList: Function
}

type State = {
    searchTerm: string
}

class Home extends Component<Props, State> {
    state = {
        searchTerm: ''
    }

    componentDidMount () {
        let { movie, data } = this.props

        if (!movie.popularList) {
            let list: PopularList = {}
            data.results.map(el => {
                list[el.id] = el
            })
            this.props.addPopularList(list)
        }
    }

    searchUpdate = (term: string): Promise => {
        return new Promise((resolve) => {
            this.setState({ searchTerm: term }, resolve)
        })
    }

    render () {
        let { data } = this.props

        let filter: Array<Object> = data.results.filter(createFilter(this.state.searchTerm, ['title']))

        return (
            <Fragment>
                <ErrorBoundary>
                    <Suspense fallback={<div></div>}>
                        <SearchBar searchUpdate={this.searchUpdate} />
                        <ContainerCards
                            width={1}
                        >
                            { data ? filter.map(el => <Card key={el.id} data={el} />) : null }
                        </ContainerCards>
                    </Suspense>
                </ErrorBoundary>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPopularList: (list: PopularList): Action => dispatch(addPopularList(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
