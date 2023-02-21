import axios from "axios"

export default async function handler(req, res) {

    let site = "https://pokeapi.co/api/v2/type/" + req.query.type

    let response
    try{
        response = await axios.get(site)
        let pokemon = response.data.pokemon
        //console.log(pokemon)
        const names = []
        pokemon.forEach((element) => {
            names.push(element.pokemon.name)
        })
        pokemon = names
        return res.status(200).json({pokemon})
        
    } catch (error) {
        console.log("error")
        res.status(400).json()
    } 
}
