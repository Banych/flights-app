import { Skeleton } from '@/components/ui/skeleton'

const SearchFormSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-44" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="h-10 grow" />
                <Skeleton className="h-10 grow" />
                <Skeleton className="h-10 w-60" />
                <Skeleton className="size-10" />
            </div>
        </div>
    )
}

export default SearchFormSkeleton
