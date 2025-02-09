const connectToMongo=require('./db')
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
var cors=require('cors')
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/api/auth",require("./routes/auth.js"))
app.use("/api/notes",require("./routes/notes.js"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//site:linkedin.com/jobs "full stack developer" and "engineer" and "job"