import { useContext } from 'react'

import { FlightsContext } from '@/components/providers/flights.provider'

export default () => {
    return useContext(FlightsContext)
}
