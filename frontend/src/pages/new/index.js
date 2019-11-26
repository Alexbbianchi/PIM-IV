import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import './styles.css'
import camera from '../../assets/camera.svg'

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null)
    const [local, setLocal] = useState('');
    const [breed, setBreed] = useState('');
    const [price, setPrice] = useState('');
    const [age, setAge] = useState('');
    const [vaccines, setVaccines] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerAdress, setOwnerAdress] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');


    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('local', local)
        data.append('breed', breed)
        data.append('price', price)
        data.append('age', age)
        data.append('vaccines', vaccines)
        data.append('weight', weight)
        data.append('height', height)
        data.append('ownerName', ownerName)
        data.append('ownerAdress', ownerAdress)
        data.append('ownerEmail', ownerEmail)

        await api.post('/horses', data, {
            headers: {
                user_id
            }
        })

        history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => {
                    setThumbnail(event.target.files[0])
                }
                } />
                <img src={camera} alt="Enviar imagem" />
            </label>

            <label className="titlesforinputs">CAVALO</label>

            <label htmlFor="text">Localização do seu cavalo!: *</label>
            <input
                id="local"
                placeholder="Informe a cidade e o estado"
                value={local}
                onChange={event => setLocal(event.target.value)}
            />

            <label htmlFor="text">Raça<span></span></label>
            <input
                id="breed"
                placeholder="Qual raça do seu cavalo?"
                value={breed}
                onChange={event => setBreed(event.target.value)}
            />

            <label htmlFor="text">Idade</label>
            <input
                id="age"
                placeholder="Qual a idade do seu cavalo? (ex: 2 anos)"
                value={age}
                type="number"
                onChange={event => setAge(event.target.value)}
            />

            <label htmlFor="text">Vacinas</label>
            <input
                id="vaccines"
                placeholder="Quais vacinas seu cavalo possui? ex: vacina para gripe, sarampo etc."
                value={vaccines}
                type="name"
                onChange={event => setVaccines(event.target.value)}
            />


            <label htmlFor="text">Peso do animal</label>
            <input
                id="weight"
                placeholder="Qual peso de seu cavalo? ex: 900kg, 1100kg"
                value={weight}
                type="number"
                onChange={event => setWeight(event.target.value)}
            />

            <label htmlFor="text">Altura do animal</label>
            <input
                id="height"
                placeholder="Qual a altura do seu cavalo em centímetros? ex: 180cm"
                value={height}
                type="number"
                onChange={event => setHeight(event.target.value)}
            />

            <label htmlFor="text">VALOR DA DIÁRIA * (em branco para GRATUITO)</label>
            <input
                id="price"
                placeholder="Qual o valor por dia para alugar?"
                value={price}
                type="number"
                onChange={event => setPrice(event.target.value)}
            />

            <label className="titlesforinputs">PROPRIETÁRIO</label>

            <label htmlFor="text">Nome do proprietario</label>
            <input
                htmlFor="name"
                required
                id="ownerName"
                placeholder="Insira o nome do proprietário"
                value={ownerName}
                onChange={event => setOwnerName(event.target.value)}
                type="name" />

            <label htmlFor="text">Email do proprietario</label>
            <input
                htmlFor="email"
                required
                id="ownerEmail"
                placeholder="Insira o email do proprietário"
                value={ownerEmail}
                onChange={event => setOwnerEmail(event.target.value)}
                type="email" />

            <label htmlFor="text">Endereço do proprietario</label>
            <input
                htmlFor="name"
                required
                id="ownerAdress"
                placeholder="Insira o endereço do proprietário"
                value={ownerAdress}
                onChange={event => setOwnerAdress(event.target.value)}
                type="name" />

            <label htmlFor="text">Telefone do proprietario</label>
            <input
                htmlFor="number"
                required
                id="ownerPhone"
                placeholder="Insira o telefone do proprietário"
                value={ownerPhone}
                onChange={event => setOwnerPhone(event.target.value)}
                type="number" />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}