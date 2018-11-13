const getRouterRedux = () => import('react-router-redux')
const getRedux = () => import('redux')
const getLogger = () => import('redux-logger')
const getThunk = () => import('redux-thunk')
const getPromise = () => import('redux-promise-middleware')
const getBrowserHistory = () => import('history/createBrowserHistory')

const getReducers = () => import('./reducers')

let imports = [
    ['react-router-redux', getRouterRedux()],
    ['redux', getRedux()],
    ['redux-logger', getLogger()],
    ['redux-thunk', getThunk()],
    ['redux-promise-middleware', getPromise()],
    ['history/createBrowserHistory', getBrowserHistory()],
    ['./reducers', getReducers()]
]

export default Promise.all(imports)
    .then(async result => {
        let res = new Map(await Promise.all(result.map(async el => [el[0], await el[1]])))

        let { syncHistoryWithStore, routerMiddleware } = res.get('react-router-redux')
        let { createStore, applyMiddleware } = res.get('redux')
        let logger = res.get('redux-logger').default
        let thunk = res.get('redux-thunk').default
        let promise = res.get('redux-promise-middleware').default
        let createBrowserHistory = res.get('history/createBrowserHistory').default

        let reducers = await res.get('./reducers').default

        const history = createBrowserHistory()
        const historyMiddleware = routerMiddleware(history)

        const store = createStore(
            reducers,
            applyMiddleware(logger, historyMiddleware, thunk, promise())
        )

        const syncHystory = syncHistoryWithStore(history, store)

        return {
            history,
            syncHystory,
            store
        }
    })
