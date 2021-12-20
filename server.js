// Modules
const express = require('express')
require('dotenv').config()
const port = process.env.PORT

// Instances
const app = express()

// Middleware
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))









app.get('/', (req, res) => {
    res.render('Index')
})

app.get('/game', (req, res) => {
    res.render('Game')
})




app.listen(port, ()=> console.log(`Listening in on ${port}`))