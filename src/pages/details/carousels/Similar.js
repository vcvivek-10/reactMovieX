import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../customHooks/useFetch'

const Similar = ({mediaType,id}) => {

    const {data,loading,error} = useFetch(`/${mediaType}/${id}/similar`)
    
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"

  return (
    <Carousel 
        endPoint={mediaType}
        data={data?.results}
        loading={loading}
        title={title}
    />
  )
}

export default Similar
