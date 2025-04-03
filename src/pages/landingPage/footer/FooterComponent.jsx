import React from 'react'
import './FooterComponent.css'
import LogoBranca from '../../assets/images/LogoTipo Branco 1.svg'

const FooterComponent = () => {
    return (
        <footer>
            <img src={LogoBranca} alt="" />
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#solucao">Solução</a></li>
                <li><a href="#essencia">Nossa Essência</a></li>
                <li><a href="#recursos">Recursos AgendFy</a></li>
                <li><a href="#contate">Contate-nos</a></li>
            </ul>
            <p>AgendFy @ 2025. Todos os direitos reservados.</p>
        </footer>
    )
}

export default FooterComponent
