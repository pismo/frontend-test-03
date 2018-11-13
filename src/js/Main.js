// @flow
import { API, KEY } from './utils'

const getReact = () => import('react')
const getReactDom = () => import('react-dom')
const getRouter = () => import('react-router-dom')
const getProvider = () => import('react-redux')
const getLoadable = () => import('react-loadable')
const getAxios = () => import('axios')

const getStore = () => import('./redux/Store')
const getStyles = () => import('./styles')

window.onload = async () => {
    let root: HTMLDivElement = document.createElement('div')
    document.body.appendChild(root)

    let imports = new Map(
        await Promise.all(
            [
                ['react', getReact()],
                ['react-dom', getReactDom()],
                ['react-router-dom', getRouter()],
                ['react-redux', getProvider()],
                ['react-loadable', getLoadable()],
                ['axios', getAxios()],
                ['Store', getStore()],
                ['./styles', getStyles()]
            ].map(async el => [el[0], await el[1]])
        )
    )

    let React = imports.get('react')
    let ReactDom = imports.get('react-dom')
    let { Route, Router } = imports.get('react-router-dom')
    let { Provider } = imports.get('react-redux')
    let Loadable = imports.get('react-loadable').default
    let axios = imports.get('axios').default

    let { store, history } = await imports.get('Store').default

    let { GlobalCss } = imports.get('./styles')

    const Home = Loadable.Map({
        loading: () => <div></div>,
        loader: {
            Home: () => import('./screens/Home'),
            data: () => axios.get(`${API}movie/popular?api_key=${KEY}&language=pt-BR`)
                .then(res => res.data)
                .catch(err => console.log(err))
        },
        render (loaded) {
            let Home = loaded.Home.default
            let data = loaded.data

            return <Home data={data} />
        }
    })

    const Details = Loadable({
        loader: () => import('./screens/Details'),
        loading: () => <div></div>
    })

    const Favorite = Loadable({
        loader: () => import('./screens/Favorite'),
        loading: () => <div></div>
    })

    ReactDom.render(
        <Provider store={store}>
            <Router history={history}>
                <React.Fragment>
                    <GlobalCss />
                    <Route path='/' exact component={Home} />
                    <Route path='/details/:id' component={Details} />
                    <Route path='/favorites' component={Favorite} />
                </React.Fragment>
            </Router>
        </Provider>,
        root
    )
}
