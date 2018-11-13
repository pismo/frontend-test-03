// @flow
import type { Action, PopularList } from '../types'
import { MOVIE_EVENTS } from '../events'

export function addPopularList (list: PopularList): Action {
    return {
        type: MOVIE_EVENTS.ADD_POPULAR,
        payload: list
    }
}
