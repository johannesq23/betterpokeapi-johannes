import axios from "axios"

export default async function handler(req, res) {
  
    let p1_name = req.body.pokemon

    let response
    try{
        
        response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + p1_name)
        let hp = response.data.stats[0].base_stat
        console.log(hp)
        let n = Math.random()*254 + 1
        let ball = Math.random()*254 + 1
        let hprand = Math.random()*hp + 1

        let f = (hp*255*4)/(hprand*ball)
        let caught
        if(f > n) {
            caught = true
        } else {
            caught = false
        }



        return res.status(200).json({caught})
    } catch (error) {
      console.log("error")
      res.status(400).json({ name: "error" })
    }
    
  }