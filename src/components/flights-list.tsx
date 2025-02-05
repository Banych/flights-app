import FlightItem from '@/components/flight-item'
import useFlightsContext from '@/hooks/use-flights-context'
import { Loader } from 'lucide-react'

const FlightsList = () => {
    const { flights, isSearchFlightsLoading } = useFlightsContext()
    return (
        <div className="flex flex-col gap-4">
            {isSearchFlightsLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader className="size-10 animate-spin text-muted-foreground" />
                    Loading...
                </div>
            ) : (
                flights.map((flight) => (
                    <FlightItem key={flight.id} flight={flight} />
                ))
            )}
        </div>
    )
}

export default FlightsList
