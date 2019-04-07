import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/router'

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) =>{
    res.send({ message: "Welcome to Banka" })
})

app.use('/api/v1', routes)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server is running on port ${port}`))

export default app