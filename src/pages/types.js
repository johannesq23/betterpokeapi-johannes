import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useRef, useState } from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Types() {
    const inputRef = useRef(null)

    const [type, setType] = useState('normal')
    
    const handleClick = () => {
        setType(inputRef.current.value)
    }



    const { data, error, isLoading, isValidating } = useSWR(`/api/types/${type}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Enter a Valid Type</h2>
        </>
    )
    let { pokemon } = data


    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <form> 
                        <label>
                            Enter type:
                            <input type = "text" ref = {inputRef}/>
                        </label>
                        <input type = "button" value = "Submit" onClick = {handleClick}/>
                    </form>
                    <h2>Type: {type}</h2>
                    <ul>{pokemon.map(poke => <li><a key = {poke} href = {`/api/pokemon/${poke}`}>{poke}</a></li>)}</ul>
                </>
            )}
        </>
    )
}