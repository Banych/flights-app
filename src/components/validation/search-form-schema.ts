import z from 'zod'

export const searchFormSchema = z.object({
    cabinClass: z.string().nonempty(),
    departureAirport: z
        .object({
            presentation: z
                .object({
                    title: z.string().nonempty(),
                })
                .required(),
            navigation: z
                .object({
                    relevantFlightParams: z.object({
                        skyId: z.string().nonempty(),
                        entityId: z.string().nonempty(),
                    }),
                })
                .required(),
        })
        .required(),
    destinationAirport: z
        .object({
            presentation: z
                .object({
                    title: z.string().nonempty(),
                })
                .required(),
            navigation: z
                .object({
                    relevantFlightParams: z.object({
                        skyId: z.string().nonempty(),
                        entityId: z.string().nonempty(),
                    }),
                })
                .required(),
        })
        .required(),
    departureDate: z.date().refine((date) => date > new Date(), {
        message: 'Departure date must be in the future',
    }),
    returnDate: z.date().optional(),
    persons: z.object({
        adults: z
            .number()
            .int()
            .min(1, { message: 'At least one adult is required' }),
        children: z.number().int().min(0),
        infants: z.number().int().min(0),
    }),
})

export type SearchFormType = z.infer<typeof searchFormSchema>
