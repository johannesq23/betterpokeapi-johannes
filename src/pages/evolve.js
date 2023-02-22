import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useRef, useState } from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Evolve() {
    const inputRef = useRef(null)

    const [name, setName] = useState('dragonite')

    const handleClick = () => {
        setName(inputRef.current.value)
    }


    const { data, error, isLoading, isValidating } = useSWR(`/api/evolve/${name}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Enter a valid pokemon name</h2>
        </>
    )
    let { evolution } = data


    return (
        <>
            <div className = "headers">
                <Link href="/"><h1>Better PokeAPI</h1></Link>
            </div>
            <form> 
                <label>
                    Enter pokemon name:
                    <input type = "text" ref = {inputRef}/>
                </label>
                <input type = "button" value = "Submit" onClick = {handleClick}/>
            </form>
            <h2>Name: {name}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Next Evolution: {evolution}</h2>
                </>
            )}
        </>
    )
}