// @flow
import React, { Component, Fragment, Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Flex } from '@rebass/grid'
import type { MovieState } from '../redux/types'
import { DetailCard } from '../styles'
const SearchBar = React.lazy(() => import('../components/SearchBar'))
const MuiCard = React.lazy(() => import('@material-ui/core/Card'))
const CardMedia = React.lazy(() => import('@material-ui/core/CardMedia'))
const Typography = React.lazy(() => import('@material-ui/core/Typography'))
const IconButton = React.lazy(() => import('@material-ui/core/IconButton'))
const StarRate = React.lazy(() => import('@material-ui/icons/StarRate'))
const Stars = React.lazy(() => import('@material-ui/icons/Stars'))

type Props = {
    dispatch?: Function,
    history?: Object,
    loaction?: Object,
    match?: Object,
    movie: MovieState
}

type State = {
    isFavorite: boolean
}
class Details extends Component<Props, State> {
    state: State = {
        isFavorite: false
    }

    data: Object = null

    constructor (props) {
        super(props)

        let { popularList } = this.props.movie
        let { match } = this.props
        this.data = popularList[match.params.id]
    }

    componentDidMount () {
        if (localStorage.getItem(this.data.id)) {
            this.setState({ isFavorite: true })
        }
    }

    toggleFavorite = () => {
        let { isFavorite } = this.state

        isFavorite ? this.removeFavorite() : this.addFavorite()

        this.setState({ isFavorite: !isFavorite })
    }

    addFavorite = () => {
        let list: Object | string = localStorage.getItem('favoriteList')
        if (list) {
            list = JSON.parse(list)
        } else {
            list = {}
        }

        list[this.data.id] = this.data

        localStorage.setItem(this.data.id, this.data.id)
        localStorage.setItem('favoriteList', JSON.stringify(list))
    }

    removeFavorite = () => {
        let list: Object = JSON.parse(localStorage.getItem('favoriteList'))

        delete list[this.data.id]
        localStorage.removeItem(this.data.id)
        localStorage.setItem('favoriteList', JSON.stringify(list))
    }

    render () {
        return (
            <Fragment>
                <ErrorBoundary>
                    <Suspense fallback={<div></div>}>
                        <SearchBar />
                        <Flex p='20px' justifyContent='center'>
                            <DetailCard
                                width={[1, 9 / 10, 8 / 10]}
                            >
                                <Flex width={[1, 1 / 3]}>
                                    <MuiCard>
                                        <CardMedia
                                            component='img'
                                            image={`https://image.tmdb.org/t/p/w500${this.data.poster_path}`}
                                        />
                                    </MuiCard>
                                </Flex>
                                <Flex width={[1, 2 / 3]} flexDirection='column' pl={[0, '15px']} mt={['15px', 0]}>
                                    <Flex flexDirection='column'>
                                        <Flex width={1} alignItems='center'>
                                            <Typography variant='h3'>{this.data.title}</Typography>
                                            <Flex ml='auto'>
                                                <IconButton onClick={this.toggleFavorite}>
                                                    {
                                                        this.state.isFavorite
                                                            ? <Stars style={{ color: '#DAA520' }} />
                                                            : <StarRate style={{ color: 'grey' }} />
                                                    }
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                        <Typography variant='h5'>{this.data.release_date}</Typography>
                                    </Flex>
                                    <Flex mt='15px'>
                                        <Typography variant='h5'>{this.data.overview}</Typography>
                                    </Flex>
                                </Flex>
                            </DetailCard>
                        </Flex>
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

export default withRouter(connect(mapStateToProps)(Details))
