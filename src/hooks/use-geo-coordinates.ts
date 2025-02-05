import { useEffect, useState } from 'react'

export default function useGeoCoordinates() {
    const [coordinates, setCoordinates] = useState<
        | {
              latitude: number
              longitude: number
          }
        | undefined
    >()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }, [])

    return coordinates
}
