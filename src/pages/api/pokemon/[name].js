import axios from "axios"

export default async function handler(req, res) {

  let site = "https://pokeapi.co/api/v2/pokemon/" + req.query.name
  let response
  try{
    response = await axios.get(site)
    let { name, sprites, types } = response.data
    let pokemonName = name
    let sprite = sprites.front_default
    let typeNames = []
    types.forEach(element => {
      typeNames.push(element.type.name)
    })
    types = typeNames
    return res.status(200).json({pokemonName, sprite, types})
  } catch (error) {
    site =  "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random()*1008 + 1)
    response = await axios.get(site)
    console.log("error")
    return res.status(400).json()
  } 
}
