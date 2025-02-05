import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
import { FC, useCallback } from 'react'

type CabinClassSelectorProps = {
    defaultValue: string
    onChange: (value: string) => void
    className?: ClassValue
}

const cabinClasses = [
    {
        value: 'economy',
        label: 'Economy',
    },
    {
        value: 'premium_economy',
        label: 'Premium economy',
    },
    {
        value: 'business',
        label: 'Business',
    },
    {
        value: 'first',
        label: 'First',
    },
]

const CabinClassSelector: FC<CabinClassSelectorProps> = ({
    defaultValue,
    onChange,
    className,
}) => {
    const handleClassClick = useCallback(
        (value: string) => {
            onChange(value)
        },
        [onChange]
    )

    return (
        <Select defaultValue={defaultValue} onValueChange={handleClassClick}>
            <SelectTrigger className={cn(className)}>
                <SelectValue placeholder="Cabin class" />
            </SelectTrigger>
            <SelectContent>
                {cabinClasses.map((cabinClass) => (
                    <SelectItem
                        key={cabinClass.value}
                        value={cabinClass.value}
                        className={cn(
                            cabinClass.value === defaultValue && 'font-semibold'
                        )}
                    >
                        {cabinClass.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CabinClassSelector
