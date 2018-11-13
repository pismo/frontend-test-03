import { Flex } from '@rebass/grid'
import styled from 'styled-components'

const DetailCard = styled(Flex)`
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 15px;
    background-color: white;
    box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
`

export default DetailCard
