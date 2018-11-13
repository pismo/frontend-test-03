const getRouterRedux = () => import('react-router-redux')
const getRedux = () => import('redux')

const getMovieReducer = () => import('./movie_reducer')

let imports = [
    ['react-router-redux', getRouterRedux()],
    ['redux', getRedux()],
    ['movie_reducer', getMovieReducer()]
]

export default Promise.all(imports)
    .then(async result => {
        let res = new Map(await Promise.all(result.map(async el => [el[0], await el[1]])))

        let { routerReducer } = res.get('react-router-redux')
        let { combineReducers } = res.get('redux')

        let movie = res.get('movie_reducer').default

        return combineReducers({
            routing: routerReducer,
            movie
        })
    })
