const type Action = {| type: string, payload?: any |}

const type PopularList = { [movie_id: number]: Object }

const type MovieState = {
    popularList: PopularList
}

export {
    Action,
    PopularList,
    MovieState
}
