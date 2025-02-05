import FlightsList from '@/components/flights-list'
import SearchForm from '@/components/search-form'
import SearchFormSkeleton from '@/components/search-form-skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import useFlightsContext from '@/hooks/use-flights-context'

function App() {
    const { isInitialAirportLoading } = useFlightsContext()

    return (
        <div className="container mx-auto flex h-full flex-col gap-3 p-4">
            {isInitialAirportLoading ? (
                <SearchFormSkeleton />
            ) : (
                <>
                    <SearchForm />
                    <ScrollArea>
                        <FlightsList />
                    </ScrollArea>
                </>
            )}
        </div>
    )
}

export default App
