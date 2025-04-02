import React from 'react'
import './saveButton.css'


const InputField = ({type, textContent}) => {

    return (
        <button type={type ? type : 'submit'}>🖫 {textContent ? textContent : 'Salvar Alterações'}</button>
        
    )
}

export default InputField