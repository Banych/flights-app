import dayjs from 'dayjs'

import { Leg, Segment } from '@/types/api'

type Layover = {
    duration: string
    airport: string
    airportCode: string
}

export const segmentLayover = (segments: Segment[]): Layover[] => {
    return segments.reduce((acc, segment, index) => {
        if (index === 0) return acc
        const arrival = dayjs(segments[index - 1].arrival)
        const departure = dayjs(segment.departure)
        const duration = departure.diff(arrival, 'minutes')
        return [
            ...acc,
            {
                duration: dayjs
                    .duration(duration, 'minutes')
                    .format('H [hr] m [min]'),
                airport: segment.origin.name,
                airportCode: segment.origin.displayCode,
            },
        ]
    }, [] as Layover[])
}

export const legLayover = (legs: Leg[]): Layover[] => {
    return legs.reduce((acc, leg, index) => {
        if (leg.stopCount === 0) {
            const arrival = dayjs(legs[index - 1].arrival)
            const departure = dayjs(leg.departure)
            const duration = departure.diff(arrival, 'minutes')
            return [
                ...acc,
                {
                    duration: dayjs
                        .duration(duration, 'minutes')
                        .format('H [hr] m [min]'),
                    airport: leg.destination.displayCode,
                    airportCode: leg.destination.displayCode,
                },
            ]
        }

        return [...acc, ...segmentLayover(leg.segments)]
    }, [] as Layover[])
}
