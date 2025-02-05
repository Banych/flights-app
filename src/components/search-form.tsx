import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import ControlledAirportInput from '@/components/controlled-airport-input'
import useFlightsContext from '@/hooks/use-flights-context'
import DatePicker from '@/components/date-picker'
import { FormType } from '@/types/form.type'
import dayjs from 'dayjs'
import PersonsSelector from '@/components/persons-selector'
import CabinClassSelector from '@/components/cabin-class-selector'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchFormSchema } from '@/components/validation/search-form-schema'

const SearchForm = () => {
    const {
        currentAirport,
        nearbyAirports,
        isInitialAirportLoading,
        searchFlights,
    } = useFlightsContext()
    const formMethods = useForm<FormType>({
        defaultValues: {
            departureAirport: currentAirport,
            persons: {
                adults: 1,
                children: 0,
                infants: 0,
            },
            cabinClass: 'economy',
        },
        resolver: zodResolver(searchFormSchema),
    })

    const isFormValid = useMemo(
        () => formMethods.formState.isValid && formMethods.formState.isDirty,
        [formMethods.formState.isDirty, formMethods.formState.isValid]
    )

    const handleSubmitForm = useCallback(
        formMethods.handleSubmit((data) => {
            searchFlights(data)
        }),
        [formMethods]
    )

    const departureDateDisabledCallback = useCallback((day: Date) => {
        return dayjs(day).isBefore(dayjs(), 'day')
    }, [])

    return (
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col items-start gap-2"
                onSubmit={handleSubmitForm}
            >
                <div className="flex items-center gap-2">
                    <Controller
                        control={formMethods.control}
                        name="persons"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <PersonsSelector
                                    defaultValues={[
                                        field.value.adults,
                                        field.value.children,
                                        field.value.infants,
                                    ]}
                                    onDoneClick={(persons) => {
                                        field.onChange(persons)
                                    }}
                                />
                                {error && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <Controller
                        control={formMethods.control}
                        name="cabinClass"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <CabinClassSelector
                                    defaultValue={field.value}
                                    onChange={field.onChange}
                                    className="min-w-44"
                                />
                                {error && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {error.message}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="grid w-full grid-cols-[1fr,1fr,1fr,auto] items-center gap-2">
                    <div className="w-full">
                        <ControlledAirportInput
                            path="departureAirport"
                            className="w-full"
                            mainPlaceholder="Departure airport"
                            isInitialAirportLoading={isInitialAirportLoading}
                            nearbyAirports={nearbyAirports}
                        />
                        {formMethods.formState.errors.departureAirport && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    formMethods.formState.errors
                                        .departureAirport.message
                                }
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <ControlledAirportInput
                            path="destinationAirport"
                            className="w-full"
                            mainPlaceholder="Destination airport"
                            nearbyAirports={nearbyAirports}
                        />
                        {formMethods.formState.errors.destinationAirport && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    formMethods.formState.errors
                                        .destinationAirport.message
                                }
                            </p>
                        )}
                    </div>
                    <div className="min-w-max">
                        <DatePicker
                            path="departureDate"
                            className="w-full"
                            dayDisabled={departureDateDisabledCallback}
                        />
                        {formMethods.formState.errors.departureDate && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    formMethods.formState.errors.departureDate
                                        .message
                                }
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        disabled={!isFormValid}
                    >
                        <Search className="size-6" />
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default SearchForm
