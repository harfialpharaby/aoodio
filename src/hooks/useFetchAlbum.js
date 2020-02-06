import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../store/actions'

export default function useFetchAlbum(artist) {
    const dispatch = useDispatch()
    const albums = useSelector(state => state.albums)

    useEffect(() => {
        dispatch(fetchAlbums(artist))
    }, [dispatch, artist])

    return albums
}