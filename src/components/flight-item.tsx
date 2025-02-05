import dayjs from 'dayjs'
import { FC, useMemo } from 'react'

import FlightOperatorsLogos from '@/components/flight-operators-logos'
import { Card, CardHeader } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { legLayover } from '@/lib/layoverCalculator'
import { Itinerary } from '@/types/api'

type FlightItemProps = {
    flight: Itinerary
}

const FlightItem: FC<FlightItemProps> = ({ flight }) => {
    const timeOfDepartureAndArrival = useMemo(() => {
        const departureTime = dayjs(flight.legs[0].departure).format('HH:mm')
        const arrivalTime = dayjs(
            flight.legs[flight.legs.length - 1].arrival
        ).format('HH:mm')
        return `${departureTime} - ${arrivalTime}`
    }, [flight])

    const duration = useMemo(() => {
        const durationInMinutes = flight.legs.reduce(
            (acc, leg) => acc + leg.durationInMinutes,
            0
        )

        const durationObj = dayjs.duration(durationInMinutes, 'minutes')

        return durationObj.days() >= 1
            ? durationObj.format('D [d] H [hr] m [min]')
            : durationObj.format('H [hr] m [min]')
    }, [flight])

    const amountOfStops = useMemo(() => {
        return flight.legs.reduce((acc, leg) => acc + leg.stopCount, 0)
    }, [flight])

    const layovers = useMemo(() => {
        return legLayover(flight.legs)
    }, [flight])

    const layoverDuration = useMemo(() => {
        return layovers.map((layover) => (
            <div key={layover.airport}>
                {layover.duration} at{' '}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>{layover.airportCode}</span>
                    </TooltipTrigger>
                    <TooltipContent>{layover.airport}</TooltipContent>
                </Tooltip>
            </div>
        ))
    }, [layovers])

    const uniqueCompanies = useMemo(() => {
        return flight.legs
            .flatMap((leg) => leg.carriers.marketing)
            .filter(
                (company, index, self) =>
                    index === self.findIndex((t) => t.id === company.id)
            )
    }, [flight])

    const airports = useMemo(() => {
        return `${flight.legs[0].origin.displayCode} - ${flight.legs[flight.legs.length - 1].destination.displayCode}`
    }, [flight])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <div className="flex w-28 justify-between">
                    <FlightOperatorsLogos companies={uniqueCompanies} />
                </div>
                <div className="grid grow grid-cols-4 grid-rows-2 gap-2">
                    <div className="font-semibold">
                        {timeOfDepartureAndArrival}
                    </div>
                    <div className="font-semibold">{duration}</div>
                    <div className="font-semibold">{amountOfStops} stop(s)</div>
                    <div className="row-span-2 text-right font-bold">
                        {flight.price.formatted}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {uniqueCompanies
                            .map((company) => company.name)
                            .join(' • ')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {airports}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {layoverDuration}
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default FlightItem
