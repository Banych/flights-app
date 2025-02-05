import { ClassValue } from 'clsx'
import { CalendarIcon } from 'lucide-react'
import { FC, useCallback, useState } from 'react'
import { useController } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DatePickerProps = {
    path: string
    dayDisabled?: (date: Date) => boolean
    className?: ClassValue
}

const DatePicker: FC<DatePickerProps> = ({ path, dayDisabled, className }) => {
    const [isOpen, setIsOpen] = useState(false)

    const {
        field: { value, onChange },
    } = useController({ name: path })

    const handleDateSelect = useCallback(
        (date: Date | undefined) => {
            setIsOpen(false)
            onChange(date)
        },
        [onChange]
    )

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !value && 'text-muted-foreground',
                        className
                    )}
                >
                    {value
                        ? new Date(value).toLocaleDateString()
                        : 'Select date'}
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleDateSelect}
                    disabled={dayDisabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
