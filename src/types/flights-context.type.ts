import { AirportDTO, Itinerary } from '@/types/api'
import { FormType } from '@/types/form.type'

export type FlightsContextType = {
    nearbyAirports: AirportDTO[]
    currentAirport?: AirportDTO
    recentAirports: AirportDTO[]
    isInitialAirportLoading?: boolean
    searchFlights: (formData: FormType) => void
    flights: Itinerary[]
    isSearchFlightsLoading?: boolean
}
