import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type FlightLogoProps = {
    logoUrl: string
    name: string
}

const FlightLogo: FC<FlightLogoProps> = ({ logoUrl, name }) => {
    const fallbackName = name
        .split(' ')
        .map((word) => word[0])
        .join('')

    return (
        <Avatar>
            <AvatarImage src={logoUrl} alt={name} />
            <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
    )
}

export default FlightLogo
