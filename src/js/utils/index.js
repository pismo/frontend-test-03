// @flow

const KEY = '7a39cd6cea58c8a2d308907ec521efb4'
const API = 'https://api.themoviedb.org/3/'

export function limitText (fulltext: string, limit: number): string {
    let words: Array<string> = fulltext.split(/\s/)
    let result: string = ''

    for (let i: number = 0; i < words.length; i++) {
        if (result.length + words[i].length + 4 > limit) {
            result += ' ...'
            return result
        }

        result += ' ' + words[i]
    }

    return result
}

export {
    KEY,
    API
}
