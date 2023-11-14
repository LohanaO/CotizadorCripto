import { useState, useEffect } from 'react'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Styled from '@emotion/styled'


const InputSubmit = Styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }

`

const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elije tu criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            //crear un arreglo de criptos
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)
        }

        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {

            setError(true)
            console.log('Todos los campos son obligatorios')
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }


    return (
        <>
            <form
                onSubmit={handleSubmit}>
                {error && <Error>Todos los campos son obligatorios</Error>}
                <SelectMonedas />

                <SelectCriptomoneda />


                <InputSubmit type='submit' value="cotizar" />

            </form>
        </>
    )
}

export default Formulario