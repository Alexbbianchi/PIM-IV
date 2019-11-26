import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'
import api from '../../services/api'
import './styles.css'

export default function Dashboard() {
    const [horses, setHorses] = useState([])
    const [requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user')
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), [user_id])

    useEffect(() => {
        socket.on('booking_request', (data) => {
            setRequests([...requests, data])
        })
    }, [requests, socket])

    useEffect(() => {
        async function loadHorses() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: {
                    user_id
                    
                }
            })

            setHorses(response.data)
        }

        loadHorses()
    }, [])

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`)
        setRequests(requests.filter(request => request._id !== id))
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`)
        setRequests(requests.filter(request => request._id !== id))
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.horse.local}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>

                    </li>
                ))}
            </ul>

            <ul className="horse-list">
                {horses.map(horse => (
                    <li key={horse._id}>
                        <header style={{
                            backgroundImage: `url(${horse.thumbnail_url})`
                        }} />
                        <strong>Localização: {horse.local}</strong>
                        <span>Cidade: {horse.local}</span>
                        <span>{horse.price ? `R$${horse.price}/dia` : 'GRATUITO'}</span>
                        <strong>Informações do animal</strong>
                        <span>Raça: {horse.breed}</span>
                        <span>Idade: {horse.age}</span>
                        <span>Peso: {horse.weight}</span>
                        <span>Altura: {horse.height}</span>
                        <span>Vacinas: {horse.vaccines}</span>
                        <strong>Proprietário:</strong>
                        <span>Nome do dono: {horse.ownerName}</span>
                        <span>Endereço do dono: {horse.ownerAdress}</span>
                        <span>Email do dono: {horse.ownerEmail}</span>
                        <span>Telefone do dono: {horse.ownerPhone}</span>
                    </li>
                ))
                }
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo Cavalo</button>
            </Link>
        </>
    )
}