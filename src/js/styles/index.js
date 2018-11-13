import searchBar from './search_bar'
import cardStyle from './card_style'
import DetailCard from './detail_card'
import { Flex } from '@rebass/grid'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalCss = createGlobalStyle`
    body {
        margin: 0px;
        background-color: #3F51B5;
    }
`

const ContainerCards = styled(Flex)`
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;

`

export {
    GlobalCss,
    searchBar,
    cardStyle,
    DetailCard,
    ContainerCards
}
