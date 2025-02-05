import axios from 'axios'

import {
    GetNearByAirportsResponse,
    SearchAirportResponse,
    SearchFlightsResponse,
    SearchFlightsParams,
} from '@/types/api'

axios.defaults.baseURL = 'https://sky-scrapper.p.rapidapi.com/api/v1'
axios.defaults.headers.common['x-rapidapi-key'] = import.meta.env.VITE_RAPID_KEY
axios.defaults.headers.common['x-rapidapi-host'] = 'sky-scrapper.p.rapidapi.com'

export default {
    getNearByAirports: async (
        lat: number,
        lng: number
    ): Promise<GetNearByAirportsResponse> => {
        const response = await axios.get<GetNearByAirportsResponse>(
            '/flights/getNearByAirports',
            {
                params: { lat, lng },
            }
        )
        return response.data
    },
    searchAirport: async (query: string): Promise<SearchAirportResponse> => {
        const response = await axios.get<SearchAirportResponse>(
            '/flights/searchAirport',
            {
                params: { query },
            }
        )
        return response.data
    },
    searchFlights: async (
        params: Partial<SearchFlightsParams>
    ): Promise<SearchFlightsResponse> => {
        const response = await axios.get<SearchFlightsResponse>(
            '/flights/searchFlights',
            { params }
        )
        return response.data
    },
}
