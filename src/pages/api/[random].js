import axios from "axios"

export default async function handler(req, res) {
    let site = "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random()*1008 + 1)
  
    let response
    try{
      response = await axios.get(site)
      let { name, sprites, types } = response.data
      let sprite = sprites.front_default
      let typeNames = []
      types.forEach(element => {
        typeNames.push(element.type.name)
      })
      types = typeNames
      return res.status(200).json({name, sprite, types})
    } catch (error) {
      console.log("error")
      res.status(200).json({ name: "error" })
    }
    
  }