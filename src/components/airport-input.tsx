import client from '@/api/client'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { AirportDTO } from '@/types/api'
import { ChevronsUpDown, Loader } from 'lucide-react'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'

export type AirportInputProps = {
    mainPlaceholder?: string
    onAirportSelect?: (airport: AirportDTO) => void
    className?: ClassValue
    dropdownClassName?: ClassValue
    defaultValue?: AirportDTO | null
    isInitialAirportLoading?: boolean
    nearbyAirports?: AirportDTO[]
    onBlur?: () => void
}

const AirportInput: FC<AirportInputProps> = ({
    mainPlaceholder,
    onAirportSelect,
    onBlur,
    className,
    dropdownClassName,
    isInitialAirportLoading,
    nearbyAirports,
    defaultValue = null,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [airports, setAirports] = useState<AirportDTO[]>(nearbyAirports ?? [])
    const [selectedAirport, setSelectedAirport] = useState<AirportDTO | null>(
        defaultValue
    )
    const [isSearchLoading, setIsSearchLoading] = useState(false)

    const buttonPlaceholder = useMemo(() => {
        return mainPlaceholder ?? 'Departure airport'
    }, [mainPlaceholder])

    const debouncedSearch = useCallback(
        debounce(async (searchTerm: string) => {
            setIsSearchLoading(true)
            const response = await client.searchAirport(searchTerm)
            setAirports(response.data)
            setIsSearchLoading(false)
        }, 300),
        [setIsSearchLoading, setAirports]
    )

    const handleAirportSelect = useCallback(
        (airport: AirportDTO) => {
            setSelectedAirport(airport)
            setSearch(airport.presentation.title)
            setIsOpen(false)

            if (onAirportSelect) {
                onAirportSelect(airport)
            }
        },
        [onAirportSelect]
    )

    const handleIsOpenChange = useCallback(() => {
        if (onBlur && !isOpen) {
            onBlur()
        }

        setIsOpen((prev) => !prev)
    }, [isOpen, onBlur])

    useEffect(() => {
        if (!search.length) return

        debouncedSearch(search)
    }, [debouncedSearch, search])

    return (
        <Popover open={isOpen} onOpenChange={handleIsOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={cn('justify-between', className)}
                    disabled={isInitialAirportLoading}
                >
                    {selectedAirport?.presentation.title ?? buttonPlaceholder}
                    {isInitialAirportLoading ? (
                        <Loader className="size-5 animate-spin" />
                    ) : (
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('max-w-[300px]', dropdownClassName)}>
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Search for an airport"
                        value={search}
                        onValueChange={setSearch}
                        isLoading={isSearchLoading}
                    />
                    <CommandList>
                        <>
                            <CommandEmpty>No results found</CommandEmpty>
                            <CommandGroup>
                                {airports.map((airport) => (
                                    <CommandItem
                                        key={airport.navigation.entityId}
                                        value={airport.navigation.entityId}
                                        onSelect={() =>
                                            handleAirportSelect(airport)
                                        }
                                    >
                                        {airport.presentation.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default memo(AirportInput)
