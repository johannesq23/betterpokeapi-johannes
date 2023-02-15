import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useRef, useState } from 'react'

const fetcher = async (url) => {
    console.log(url)
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
}

export default function Name() {
    const inputRef = useRef(null)

    const [name, setName] = useState('dragonite')

    const handleClick = () => {
        setName(inputRef.current.value)
    }
    
    let { data, error, isLoading, isValidating } = useSWR(`/api/pokemon/${name}`, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>error fetching</h2>
        </>
    )
    let { pokemonName, sprite, types } = data
    

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                
                <>
                <form> 
                    <label>
                        Enter pokemon name:
                        <input type = "text" ref = {inputRef}/>
                    </label>
                    <input type = "button" value = "Submit" onClick = {handleClick}/>
                </form>
                    <h2>Name: {pokemonName}</h2>
                    <img src={sprite} />
                    <h2>Types: {types.map(type => <span key = {type}>{type} </span>)}</h2>
                </>
            )}
        </>
    )
}