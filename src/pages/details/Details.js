import React from 'react'
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../customHooks/useFetch'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {

	const { mediaType, id } = useParams()
	const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
	// rename for remove ther sameName error for dubble api call 
	const { data: credits, loading: creditLoading } = useFetch(`/${mediaType}/${id}/credits`)

	return (
		<div>
			<DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
			<Cast data={credits?.cast} loading={creditLoading} />
			<VideosSection data={data} loading={loading} />
			<Similar mediaType={mediaType} id={id} />
			<Recommendation mediaType={mediaType} id={id} />
		</div>
	)
}

export default Details
