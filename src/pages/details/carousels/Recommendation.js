import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../customHooks/useFetch'

const Recommendation = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <Carousel
            endPoint={mediaType}
            data={data?.results}
            loading={loading}
            title="Recommendations"
        />
    )
}

export default Recommendation
