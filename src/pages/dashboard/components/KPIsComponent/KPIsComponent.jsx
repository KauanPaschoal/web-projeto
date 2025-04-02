import React from 'react'
import './KPIsComponent.css'

const KPIsComponent = (valores) => {

    

    return (
        <div className='card-kpi'>
            <span>{valores.valor}</span>
            <p>{valores.texto}</p>
        </div>
    )
}

export default KPIsComponent