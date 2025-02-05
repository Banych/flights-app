import { ChevronsUpDown, UserRound } from 'lucide-react'
import { FC, useCallback, useState } from 'react'

import Counter from '@/components/counter'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

type PersonsSelectorProps = {
    defaultValues?: [number, number, number]
    onDoneClick?: (persons: [number, number, number]) => void
}

const PersonsSelector: FC<PersonsSelectorProps> = ({
    defaultValues,
    onDoneClick,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [adultsCounts, setAdultsCount] = useState(defaultValues?.[0] ?? 1)
    const [childrenCounts, setChildrenCount] = useState(defaultValues?.[1] ?? 0)
    const [infantsCounts, setInfantsCount] = useState(defaultValues?.[2] ?? 0)
    const [personsCount, setPersonsCount] = useState(
        defaultValues?.reduce((acc, curr) => acc + curr, 0) ?? 1
    )

    const handleDoneClick = useCallback(() => {
        setIsOpen(false)
        setPersonsCount(adultsCounts + childrenCounts + infantsCounts)
        if (onDoneClick) {
            onDoneClick([adultsCounts, childrenCounts, infantsCounts])
        }
    }, [adultsCounts, childrenCounts, infantsCounts, onDoneClick])

    const handleResetClick = useCallback(() => {
        setAdultsCount(1)
        setChildrenCount(0)
        setInfantsCount(0)
        setPersonsCount(1)
    }, [])

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                    <UserRound className="size-4 shrink-0 opacity-50" />
                    {personsCount}
                    <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <Counter
                        title="Adults"
                        value={adultsCounts}
                        onIncrement={() => setAdultsCount(adultsCounts + 1)}
                        onDecrement={() =>
                            setAdultsCount((prev) => (prev ? prev - 1 : 0))
                        }
                    />
                    <Counter
                        title="Children"
                        subtitle="2-12 years"
                        value={childrenCounts}
                        onIncrement={() => setChildrenCount(childrenCounts + 1)}
                        onDecrement={() =>
                            setChildrenCount((prev) => (prev ? prev - 1 : 0))
                        }
                    />
                    <Counter
                        title="Infants"
                        subtitle="0-2 years"
                        value={infantsCounts}
                        onIncrement={() => setInfantsCount(infantsCounts + 1)}
                        onDecrement={() =>
                            setInfantsCount((prev) => (prev ? prev - 1 : 0))
                        }
                    />
                </div>
                <div className="flex justify-between gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetClick}
                    >
                        Reset
                    </Button>
                    {onDoneClick && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleDoneClick}
                        >
                            Done
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PersonsSelector
