import React, { useState } from 'react'
import "./style.scss"
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import useFetch from '../../../customHooks/useFetch'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/img'
import PosterFallback from "../../../assets/no-poster.png"
import dayjs from 'dayjs'
import Genres from '../../../components/genres/Genres'
import CircleRating from '../../../components/circleRating/CircleRating'
import PlayBtn from '../PlayBtn'
import VideoPopup from '../../../components/videoPopup/VideoPopup'

const DetailsBanner = ({ video, crew }) => {
// console.log(video);
    const [show,setShow] = useState(false)
    const [videoId,setVideoId] = useState(null)

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector((state) => state.home)
    console.log(url, data);

    const _genres = data?.genres?.map((g) => g.id)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
    }

    const director = crew?.filter((f) => f.job === "Director")
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")

    // console.log(director,writer);

    return (
        <div className='detailsBanner'>
            {
                !loading ? (
                    <>
                        {
                            /* for avoid optional chaning use below condition and fragment ex data?.backdrop_path */
                            !!data && (
                                <React.Fragment>
                                    <div className="backdrop-img">
                                        <Img src={url.backdrop + data.backdrop_path} />
                                    </div>
                                    <div className="opacity-layer"></div>
                                    <ContentWrapper>
                                        <div className="content">
                                            <div className="left">
                                                {
                                                    data.backdrop_path ? (
                                                        <Img
                                                            className="posterImg"
                                                            src={url.backdrop + data.backdrop_path}
                                                        />
                                                    ) : (
                                                        <Img
                                                            className="posterImg"
                                                            src={PosterFallback}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <div className="right">
                                                <div className="title">
                                                    {
                                                        `${data.name || data.title} 
                                                        (${dayjs(data.release_date).format("YYYY")})`
                                                    }
                                                </div>

                                                <div className="subtitle">
                                                    {data.tagline}
                                                </div>

                                                <Genres data={_genres} />

                                                <div className="row">

                                                    <CircleRating rating={data.vote_average.toFixed(1)} />

                                                    <div className="playbtn"
                                                        onClick={() => {
                                                            setShow(true)
                                                            setVideoId(video.key)
                                                        }}
                                                    >
                                                        <PlayBtn />
                                                        <span className="text">
                                                            Watch Trailer
                                                        </span>
                                                    </div>

                                                </div>

                                                <div className="overview">
                                                    <div className="heading">
                                                        Overview
                                                    </div>
                                                    <div className="description">
                                                        {data.overview}
                                                    </div>
                                                </div>

                                                <div className="info">
                                                    {
                                                        data.status && (
                                                            <div className="infoItem">
                                                                <span className="text bold">
                                                                    Status:{" "}
                                                                </span>
                                                                <span className='text'>
                                                                    {data.status}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        data.release_date && (
                                                            <div className="infoItem">
                                                                <span className="text bold">
                                                                    Realease Date:{" "}
                                                                </span>
                                                                <span className='text'>
                                                                    {
                                                                        dayjs(data.release_date).format("MMM D, YYYY")
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        data.runtime && (
                                                            <div className="infoItem">
                                                                <span className="text bold">
                                                                    Runtime:{" "}
                                                                </span>
                                                                <span className='text'>
                                                                    {
                                                                        toHoursAndMinutes(data.runtime)
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                {
                                                    director?.length > 0 && (
                                                        <div className="info">
                                                            <span className="text bold">
                                                                Director:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {
                                                                    director?.map((d, i) => (
                                                                        <span key={i}>
                                                                            {d.name}
                                                                            {/* below for quama separation for multiple director */}
                                                                            {director.length - 1 !== i && ", "}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    writer?.length > 0 && (
                                                        <div className="info">
                                                            <span className="text bold">
                                                                Writer:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {
                                                                    writer?.map((d, i) => (
                                                                        <span key={i}>
                                                                            {d.name}
                                                                            {/* below for quama separation for multiple writer */}
                                                                            {writer.length - 1 !== i && ", "}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data?.created_by?.length > 0 && (
                                                        <div className="info">
                                                            <span className="text bold">
                                                                Creator:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {
                                                                    data?.created_by?.map((d, i) => (
                                                                        <span key={i}>
                                                                            {d.name}
                                                                            {/* below for quama separation for multiple writer */}
                                                                            { data?.created_by?.length - 1 !== i && ", "}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                        <VideoPopup 
                                            show={show}
                                            setShow={setShow}
                                            videoId={videoId}
                                            setVideoId={setVideoId}
                                        />
                                    </ContentWrapper>
                                </React.Fragment>
                            )
                        }
                    </>
                ) : (
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </ContentWrapper>
                    </div>
                )
            }
        </div>
    )
}

export default DetailsBanner
