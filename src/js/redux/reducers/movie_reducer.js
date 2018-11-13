// @flow
import type { Action, MovieState } from '../types'
import { MOVIE_EVENTS } from '../events'

const movieReducer: Function = (
    state: MovieState = {
        popularList: null
    },
    action: Action
): MovieState => {
    switch (action.type) {
    case MOVIE_EVENTS.ADD_POPULAR :
        state = {
            ...state,
            popularList: action.payload
        }
        break
    }

    return state
}

export { MOVIE_EVENTS }
export default movieReducer
