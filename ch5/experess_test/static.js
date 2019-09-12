const express = require('express')
const app = express()

app.listen(3000, () =>{
  console.log("起動しました - http://localhost:3000")
})

app.use('/', express.static('./html'))