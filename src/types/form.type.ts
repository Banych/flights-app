import { AirportDTO, CabinClass } from '@/types/api'

export type FormType = {
    departureAirport: AirportDTO
    destinationAirport: AirportDTO
    departureDate: Date
    returnDate?: Date
    persons: {
        adults: number
        children: number
        infants: number
    }
    cabinClass: CabinClass
}
