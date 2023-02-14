import axios from "axios"

export default async function handler(req, res) {

  let site = "https://pokeapi.co/api/v2/pokemon-species/" + req.query.name

  let response
  try{
    response = await axios.get(site)
    let { url } = response.data.growth_rate
    let rate = await axios.get(url)
    let levels = rate.data.levels

    let currentLevel = req.query.level
    let experience = levels[currentLevel - 1].experience


    return res.json({experience})

  } catch (error) {
    console.log("error")
    return res.json({})
  } 
}
