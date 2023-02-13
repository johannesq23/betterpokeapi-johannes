import axios from "axios"

export default async function handler(req, res) {

  let site = "https://pokeapi.co/api/v2/pokemon-species/" + req.query.name

  let response
  let chain
  try{
    response = await axios.get(site)
    let { url } = response.data.evolution_chain
    
    chain = await axios.get(url)
    let { species, evolves_to } = chain.data.chain
    let eChain = []
    eChain.push(species.name)
    if (evolves_to[0] != null && "species" in evolves_to[0]) {
      eChain[1] = evolves_to[0].species.name
      if(evolves_to[0].evolves_to[0] != null) {
        eChain[2] = evolves_to[0].evolves_to[0].species.name
      }

    }

    let index = eChain.findIndex(element => element == req.query.name)
    
    let evolution = eChain[Math.min(index + 1, eChain.length - 1)]
    
    return res.json({evolution})

  } catch (error) {
    console.log("error")
    return res.json({})
  } 
}
