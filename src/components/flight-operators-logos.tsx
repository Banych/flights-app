import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Carrier } from '@/types/api'

type FlightOperatorsLogosProps = {
    companies: Carrier[]
}

const FlightOperatorsLogos: FC<FlightOperatorsLogosProps> = ({ companies }) => {
    return (
        <div className="flex items-center gap-2">
            {companies.map((company) => (
                <Tooltip key={company.id}>
                    <TooltipTrigger asChild>
                        <Avatar className="-ml-8 size-12 border-2 border-solid border-gray-600 bg-slate-100 first-of-type:ml-0">
                            <AvatarImage
                                src={company.logoUrl}
                                alt={company.name}
                            />
                            <AvatarFallback>
                                {company.name.split(' ').map((word) => word[0])}
                            </AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                        {company.name}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}

export default FlightOperatorsLogos
