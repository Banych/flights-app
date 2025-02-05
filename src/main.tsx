import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FlightsProvider from '@/components/providers/flights.provider.tsx'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'

dayjs.extend(duration)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FlightsProvider>
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </FlightsProvider>
    </StrictMode>
)
