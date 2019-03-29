import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(express.json)
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server is running on port ${port}`))

export default app