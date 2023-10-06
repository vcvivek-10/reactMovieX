import React, { useState } from 'react'
import "./Style.scss"

const SwitchTabs = ({ data, onTabChange }) => {

    const [selected, setSelected] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTabs = (tab, index) => {
        // activetab moveing between then data array with its 100px width that given in scss 
        setLeft(index * 100)
        setTimeout(() => {
            setSelected(index)
        }, 300);
        onTabChange(tab, index)
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {
                    data.map((tab, index) => (
                        <span
                            key={index}
                            className={`tabItem ${selected === index ? "active" : ""}`}
                            onClick={() => activeTabs(tab, index)}
                        >
                            {tab}
                        </span>
                    ))
                }
                <span className='movingBg' style={{ left: left }} />
            </div>
        </div>
    )
}


export default SwitchTabs
