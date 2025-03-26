import React from 'react'
import './contato.css'

const ContatoComponent = () => {
  return (
    <div className='contato-section' id='contate'>
      <h1 className='titulo-section'>CONTATE-NOS</h1>
      <h3 className='subtitulo-section'>ENTRE EM CONTATO CONOSCO</h3>
      <form className='contato-form'>
        <label htmlFor="Nome">Nome</label>
        <input type="text" placeholder='Nome' name='Nome' id='ipt_nome'/>
        <label htmlFor="Email">Email</label>
        <input type="email" placeholder='Email' name='Email' id='ipt_email'/>
        <label htmlFor="Assunto">Assunto</label>
        <input type="text" placeholder='Assunto' name='Assunto' id='ipt_assunto'/>
        <label htmlFor="Mensagem">Mensagem</label>
        <textarea placeholder='Mensagem' name='Mensagem' id='ipt_mensagem'></textarea>
        <button type='submit' className='btn_primario flex justify-center text-center'>
          ENVIAR
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ContatoComponent