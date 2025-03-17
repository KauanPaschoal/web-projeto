import React from 'react'
import Rectangle from '../../images/Rectangle 11.svg'

const Divisao = () => {
    return (
        <div className="divisao">
            <img src={Rectangle} alt="" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-6 w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            <img src={Rectangle} alt="" />
        </div>
    )
}

export default Divisao