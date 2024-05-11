import app from "./app"

import mongoose from "mongoose"

const port = process.env.PORT || 3000
const db_url="mongodb+srv://famicoofficial24:famico@famico.6sq5hwz.mongodb.net/data?retryWrites=true&w=majority&appName=Famico"


const db = mongoose
 .connect(db_url)
 .then(()=>console.log("mongo db   OK"))
 .catch(()=>console.log("mongo db  FATAL ERROR"))

app.listen(port, () => {
    console.log(`listening on port ${port}  OK`)
  })