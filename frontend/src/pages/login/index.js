import React, { useState } from 'react'
import api from '../../services/api.js'

export default function Login({ history }) {
  const [email, setEmail] = useState('')
  console.log(email)
  async function handleSubmit(event) {
    event.preventDefault()

    const response = await api.post('/sessions', {
      email
    })

    const { _id } = response.data

    localStorage.setItem('user', _id)

    history.push('/dashboard')
  }


  return (
    <>
      <p>
        Ofereça <strong>Cavalos</strong> para pessoas alugarem ou comprarem
            </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          htmlFor="email"
          required
          id="email"
          type="email"
          placeholder="Insira seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />


        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}