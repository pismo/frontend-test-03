// @flow

import React, { Component, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { limitText } from '../utils'
import { Flex } from '@rebass/grid'
import { cardStyle } from '../styles'
import { withRouter } from 'react-router-dom'
const MuiCard = React.lazy(() => import('@material-ui/core/Card'))
const CardContent = React.lazy(() => import('@material-ui/core/CardContent'))
const CardMedia = React.lazy(() => import('@material-ui/core/CardMedia'))
const Typography = React.lazy(() => import('@material-ui/core/Typography'))
const CardActionArea = React.lazy(() => import('@material-ui/core/CardActionArea'))

type Props = {
    data: Object,
    history?: Object,
    location?: Object,
    match?: Object,
    staticContext?: any
}

class Card extends Component<Props> {
    clicked = () => this.props.history.push(`/details/${this.props.data.id}`)

    render () {
        let { data } = this.props
        return (
            <Flex width={[1, 1 / 2 * 0.95, 1 / 3 * 0.95, 1 / 4 * 0.95]} mb='30px'>
                <ErrorBoundary>
                    <Suspense fallback={<div></div>}>
                        <MuiThemeProvider theme={cardStyle}>
                            <MuiCard>
                                <CardActionArea onClick={this.clicked}>
                                    <CardMedia
                                        component='img'
                                        height='390'
                                        image={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                                    />
                                    <CardContent>
                                        <Flex flexDirection='column' style={{ height: '95px' }} mb='10px'>
                                            <Typography variant='h6'>{data.title}</Typography>
                                            <Typography variant='subtitle1'>{data.release_date.split('-').reverse().join('-')}</Typography>
                                        </Flex>
                                        <Flex style={{ height: '170px' }}>
                                            <Typography variant='body1'>{limitText(data.overview, 140)}</Typography>
                                        </Flex>
                                    </CardContent>
                                </CardActionArea>
                            </MuiCard>
                        </MuiThemeProvider>
                    </Suspense>
                </ErrorBoundary>
            </Flex>
        )
    }
}

export default withRouter(Card)
