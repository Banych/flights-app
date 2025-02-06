import dayjs from 'dayjs'
import { FC, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'

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

    const timeOfDeparture = useMemo(() => {
        return dayjs(flight.legs[0].departure).format('HH:mm')
    }, [flight])

    const timeOfArrival = useMemo(() => {
        return dayjs(flight.legs[flight.legs.length - 1].arrival).format(
            'HH:mm'
        )
    }, [flight])

    const departureAirport = useMemo(() => {
        return flight.legs[0].origin.displayCode
    }, [flight])

    const arrivalAirport = useMemo(() => {
        return flight.legs[flight.legs.length - 1].destination.displayCode
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

    const layoverDurationInAirports = useMemo(() => {
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

    const layoverDurationInAirportsWithArrow = useMemo(() => {
        return layovers.map((layover, index) => (
            <div
                key={layover.airport}
                className="inline-flex items-center gap-1"
            >
                {layover.duration} at{' '}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>{layover.airportCode}</span>
                    </TooltipTrigger>
                    <TooltipContent>{layover.airport}</TooltipContent>
                </Tooltip>
                {index !== layovers.length - 1 && (
                    <ArrowRight className="h-6 w-10 text-muted-foreground" />
                )}
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
                <div className="hidden grow sm:flex">
                    <div className="flex w-28 justify-between">
                        <FlightOperatorsLogos companies={uniqueCompanies} />
                    </div>
                    <div className=" grid grow grid-cols-4 grid-rows-2 gap-2">
                        <div className="font-semibold">
                            {timeOfDepartureAndArrival}
                        </div>
                        <div className="font-semibold">{duration}</div>
                        <div className="font-semibold">
                            {amountOfStops} stop(s)
                        </div>
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
                            {layoverDurationInAirports}
                        </div>
                    </div>
                </div>
                <div className="flex grow flex-col gap-2 sm:hidden">
                    <div className="grid grid-cols-3 grid-rows-1">
                        <FlightOperatorsLogos companies={uniqueCompanies} />
                        <div className="flex-col">
                            <div className="font-semibold">{duration}</div>
                            <div className="text-xs text-muted-foreground">
                                {uniqueCompanies
                                    .map((company) => company.name)
                                    .join(' • ')}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between font-semibold">
                                <span>{timeOfDeparture}</span>
                                <ArrowRight className="size-6 text-muted-foreground" />
                                <span>{timeOfArrival}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm font-light text-muted-foreground">
                                <span>{departureAirport}</span>
                                <span>{arrivalAirport}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr,auto] grid-rows-1 gap-x-2">
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <div className="text-sm font-semibold">
                                {amountOfStops} stop(s)
                            </div>
                            <div>{layoverDurationInAirportsWithArrow}</div>
                        </div>
                        <div className="row-span-2 text-right font-bold">
                            {flight.price.formatted}
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default FlightItem
