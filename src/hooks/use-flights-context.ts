import { FlightsContext } from '@/components/providers/flights.provider'
import { useContext } from 'react'

export default () => {
    return useContext(FlightsContext)
}
