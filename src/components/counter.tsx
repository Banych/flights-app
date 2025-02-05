import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
import { Minus, Plus } from 'lucide-react'
import { FC } from 'react'

type CounterProps = {
    title: string
    subtitle?: string
    value: number
    onIncrement: () => void
    onDecrement: () => void
    className?: ClassValue
}

const Counter: FC<CounterProps> = ({
    onDecrement,
    onIncrement,
    value,
    title,
    subtitle,
    className,
}) => {
    return (
        <div className={cn('flex justify-between gap-2', className)}>
            <div className="flex flex-col justify-center">
                <span>{title}</span>
                {subtitle && (
                    <span className="text-xs text-muted-foreground">
                        {subtitle}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={onDecrement}>
                    <Minus className="size-4 shrink-0 opacity-50" />
                </Button>
                <span className="w-6 text-center text-lg font-semibold">
                    {value}
                </span>
                <Button variant="outline" size="icon" onClick={onIncrement}>
                    <Plus className="size-4 shrink-0 opacity-50" />
                </Button>
            </div>
        </div>
    )
}

export default Counter
