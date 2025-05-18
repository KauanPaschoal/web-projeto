import React, { Children, useState } from 'react'
import './MainComponent.css'
import { FaBell } from 'react-icons/fa'
import NotificacaoComponent from '../NotificacaoComponent/NotificacaoComponent'



const MainComponent = ({ title, headerContent, children, mostrarIconeNotificacao }) => {
    const [showIconNotificacao, setShowIconNotificacao] = useState(true);
    const [showNotificacao, setShowNotificacao] = useState(false);

    React.useEffect(() => {
        if (mostrarIconeNotificacao === undefined) {
            setShowIconNotificacao(true);
        } else {
            setShowIconNotificacao(mostrarIconeNotificacao);
        }
    }, [mostrarIconeNotificacao]);


    const toggleNotificacao = () => setShowNotificacao((prev) => !prev);
  
    return (
        <div className='div-main'>
            <div className='flex justify-between items-center w-full p-4 relative'>
                <h1 className='titulo'>{title}</h1>
                {showIconNotificacao && (<div>
                    <FaBell className='bell-icon cursor-pointer'
                        size={24}
                        onClick={toggleNotificacao} />
                    
                    {showNotificacao && (
                        <div style={{ position: 'absolute', right: 0, top: '3em', zIndex: 1000 }}>
                            <NotificacaoComponent aberta={showNotificacao} />
                        </div>
                    )}
                </div>)}
            </div>

            <section className='main-section'>
                <div className='cabecalho'>
                    {headerContent ? headerContent : <h2>Cabeçalho</h2>}
                </div>
                <div className='conteudo'>
                    {children}
                </div>

            </section>
        </div>
    )
}

export default MainComponent