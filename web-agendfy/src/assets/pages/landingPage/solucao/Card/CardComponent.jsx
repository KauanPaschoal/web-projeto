import React from 'react'
import CardIcon1 from '../../../../images/icons/Vector.svg'
import './card.css'

const CardComponent = () => {
    return (
        <div className='card-content w-full sm:w-1/2 text-md md:w-1/2 text-base lg:w-1/3 xl:w-1/3 p-4 text-sm'>
            <img src={CardIcon1} className="card-icon w-8 h-8" alt="" />
            <h5 className='text-full sm:text-sm'>Facilite o gerenciamento de agendas com a Dashboard customizada!</h5>
        </div>
    )
}

export default CardComponent