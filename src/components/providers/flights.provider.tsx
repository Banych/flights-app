import client from '@/api/client'
import useGeoCoordinates from '@/hooks/use-geo-coordinates'
import { AirportDTO, Itinerary } from '@/types/api'
import { FlightsContextType } from '@/types/flights-context.type'
import { FormType } from '@/types/form.type'
import dayjs from 'dayjs'
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react'

const defaultContextValue: FlightsContextType = {
    nearbyAirports: [],
    recentAirports: [],
    searchFlights: () => {},
    flights: [],
}

export const FlightsContext =
    createContext<FlightsContextType>(defaultContextValue)

const FlightsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isInitialAirportLoading, setIsInitialAirportLoading] = useState(true)
    const [initialAirport, setInitialAirport] = useState<AirportDTO>()
    const [nearbyAirports, setNearbyAirports] = useState<AirportDTO[]>([])
    const [flights, setFlights] = useState<Itinerary[]>([])
    const [isSearchFlightsLoading, setIsSearchFlightsLoading] = useState(false)
    const currentCoordinates = useGeoCoordinates()

    const searchFlights = useCallback(async (formData: FormType) => {
        console.log(formData)

        setFlights([])
        setIsSearchFlightsLoading(true)

        const result = await client.searchFlights({
            originSkyId:
                formData.departureAirport.navigation.relevantFlightParams.skyId,
            originEntityId:
                formData.departureAirport.navigation.relevantFlightParams
                    .entityId,
            destinationSkyId:
                formData.destinationAirport.navigation.relevantFlightParams
                    .skyId,
            destinationEntityId:
                formData.destinationAirport.navigation.relevantFlightParams
                    .entityId,
            date: dayjs(formData.departureDate).format('YYYY-MM-DD'),
            adults: formData.persons.adults,
            children: formData.persons.children,
            infants: formData.persons.infants,
            cabinClass: formData.cabinClass,
            currency: 'EUR',
        })
        setFlights((prev) => [...prev, ...result.data.itineraries])
        setIsSearchFlightsLoading(false)
        console.log(result)
    }, [])

    useEffect(() => {
        if (!currentCoordinates) {
            setIsInitialAirportLoading(false)
            return
        }

        setIsInitialAirportLoading(true)
        client
            .getNearByAirports(
                currentCoordinates.latitude,
                currentCoordinates.longitude
            )
            .then((response) => {
                setInitialAirport(response.data.current)
                setNearbyAirports(response.data.nearby)
                setIsInitialAirportLoading(false)
            })
    }, [
        currentCoordinates,
        currentCoordinates?.latitude,
        currentCoordinates?.longitude,
    ])

    return (
        <FlightsContext.Provider
            value={{
                currentAirport: initialAirport,
                nearbyAirports,
                recentAirports: [],
                isInitialAirportLoading,
                flights,
                searchFlights,
                isSearchFlightsLoading,
            }}
        >
            {children}
        </FlightsContext.Provider>
    )
}

export default FlightsProvider
