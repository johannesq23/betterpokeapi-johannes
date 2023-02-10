import axios from "axios"

export default async function handler(req, res) {
    let site = "https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random()*1008 + 1)
  
    let response
    try{
      response = await axios.get(site)
      const { name } = response.data
      res.status(200).json({name: response.data.name})
    } catch (error) {
      console.log("error")
      res.status(200).json({ name: "error" })
    }
    
  }