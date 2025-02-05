import AirportInput, { AirportInputProps } from '@/components/airport-input'
import { AirportDTO } from '@/types/api'
import { FC, useCallback } from 'react'
import { useController } from 'react-hook-form'

type ControlledAirportInputProps = AirportInputProps & {
    path: string
}

const ControlledAirportInput: FC<ControlledAirportInputProps> = ({
    path,
    onAirportSelect,
    ...others
}) => {
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: path })

    const handleAirportChange = useCallback(
        (airport: AirportDTO) => {
            onChange(airport)
            if (onAirportSelect) {
                onAirportSelect(airport)
            }
        },
        [onChange, onAirportSelect]
    )

    return (
        <AirportInput
            {...others}
            onBlur={onBlur}
            defaultValue={value}
            onAirportSelect={handleAirportChange}
        />
    )
}

export default ControlledAirportInput
