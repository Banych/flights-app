export type AirportDTO = {
    presentation: {
        title: string
        suggestionTitle: string
        subtitle: string
    }
    navigation: {
        entityId: string
        entityType: string
        localizedName: string
        relevantFlightParams: {
            skyId: string
            entityId: string
            flightPlaceType: string
            localizedName: string
        }
        relevantHotelParams: {
            entityId: string
            entityType: string
            localizedName: string
        }
    }
}

export type GetNearByAirportsResponse = {
    status: boolean
    timestamp: number
    data: {
        current: AirportDTO
        nearby: AirportDTO[]
        recent: AirportDTO[]
    }
}

export type SearchAirportResponse = {
    status: boolean
    timestamp: number
    data: Array<AirportDTO>
}

export type SearchFlightsResponse = {
    status: boolean
    timestamp: number
    sessionId: string
    data: {
        context: {
            status: string
            totalResults: number
        }
        itineraries: Itinerary[]
    }
}

export type Itinerary = {
    id: string
    price: {
        raw: number
        formatted: string
    }
    legs: Leg[]
    isSelfTransfer: boolean
    isProtectedSelfTransfer: boolean
    farePolicy: FarePolicy
    eco?: {
        ecoContenderDelta: number
    }
    tags: string[]
    isMashUp: boolean
    hasFlexibleOptions: boolean
    score: number
}

export type Leg = {
    id: string
    origin: Place
    destination: Place
    durationInMinutes: number
    stopCount: number
    isSmallestStops: boolean
    departure: string
    arrival: string
    timeDeltaInDays: number
    carriers: {
        marketing: Carrier[]
        operationType: string
    }
    segments: Segment[]
}

export type Place = {
    id: string
    name: string
    displayCode: string
    city: string
    isHighlighted: boolean
}

export type Carrier = {
    id: number
    logoUrl: string
    name: string
}

export type Segment = {
    id: string
    origin: SegmentPlace
    destination: SegmentPlace
    departure: string
    arrival: string
    durationInMinutes: number
    flightNumber: string
    marketingCarrier: CarrierInfo
    operatingCarrier: CarrierInfo
}

export type SegmentPlace = {
    flightPlaceId: string
    displayCode: string
    parent: ParentPlace
    name: string
    type: string
}

export type ParentPlace = {
    flightPlaceId: string
    displayCode: string
    name: string
    type: string
}

export type CarrierInfo = {
    id: number
    name: string
    alternateId: string
    allianceId: number
}

export type FarePolicy = {
    isChangeAllowed: boolean
    isPartiallyChangeable: boolean
    isCancellationAllowed: boolean
    isPartiallyRefundable: boolean
}

export type SearchFlightsParams = {
    originSkyId: string
    destinationSkyId: string
    originEntityId: string
    destinationEntityId: string
    date: string
    cabinClass: CabinClass
    adults: number
    children: number
    infants: number
    sortBy: string
    currency: string
    market: string
    countryCode: string
}

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first'
