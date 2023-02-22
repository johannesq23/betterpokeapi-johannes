import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useRef, useState } from 'react'

const fetcher = async (post) => {
    
    const res = await axios.post(post[0], {
        pokemon1: post[1],
        pokemon2: post[2]
    })
    return res.data
}

export default function Battle() {
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)

    const [pokemon1, setName1] = useState('pikachu')
    const [pokemon2, setName2] = useState('lucario')
    
    const handleClick = () => {
        setName1(inputRef1.current.value)
        setName2(inputRef2.current.value)
    }

    const { data, error, isLoading, isValidating } = useSWR([`/api/battle/`, pokemon1, pokemon2], fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { winner } = data

    return (
        <>
            <div className = "headers">
                <Link href="/"><h1>Better PokeAPI</h1></Link>
            </div>
            <form> 
                <label>
                    Enter pokemon1 name:
                    <input type = "text" ref = {inputRef1}/>
                </label>
                <br></br>
                <label>
                    Enter pokemon2 name:
                    <input type = "text" ref = {inputRef2}/>
                </label>
                <br></br>
                <input type = "button" value = "Submit" onClick = {handleClick}/>
            </form>
            <h2>Battle: {pokemon1} vs. {pokemon2}</h2>

            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Winner: {winner}</h2>
                </>
            )}
        </>
    )
}