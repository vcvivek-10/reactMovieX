import React from 'react'
import "./style.scss"
import { useSelector } from 'react-redux'

const Genres = ({ data }) => {

    const { genres } = useSelector((state) => state.home)

    return (
        <div className='genres'>
            {
                data?.map((key) => {
                    if (!genres[key]?.name) return
                    return (
                        <div className="genre" key={key}>
                            {genres[key]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres
