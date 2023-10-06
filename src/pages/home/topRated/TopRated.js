import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../customHooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {

    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/top_rated`)
    console.log(data);

    const onTabChange = (tab, index) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">
                    Top Rated
                </span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel endPoint={endPoint} data={data?.results} loading={loading}/>
        </div>
    )
}

export default TopRated
