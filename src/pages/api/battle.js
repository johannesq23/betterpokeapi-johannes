import axios from "axios"

export default async function handler(req, res) {
  
    let p1_name = req.body.pokemon1
    let p2_name = req.body.pokemon2


    let response1
    let response2
    try{
        response1 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + p1_name)
        response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + p2_name)
        
        let s1 = response1.data.stats[0].base_stat
        let s2 = response2.data.stats[0].base_stat

        let winner
        if( s1 > s2) {
            winner = p1_name
        } else if( s1 < s2) {
            winner = p2_name
        } else {
            winner = "Tie"
        }
        
        return res.status(200).json({winner})
    } catch (error) {
      console.log("error")
      res.status(200).json({ name: "error" })
    }
    
  }