import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/API'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading("Loading...")
        setData(null)
        setError(null)

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false)
                setData(res)
            }).catch((err) => {
                console.log(err);
                setLoading(false)
                setError("Something went wrong!")
            });

    }, [url])

    return { data, loading, error }
}

export default useFetch
