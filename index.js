const express = require('express')
const cors = require('cors')

const app = express()
const config = require('./config/index')
const { logger } = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello world</h1>')
})

app.post('/api/notes', (req, res) => {
  const data = req.body
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const note = {
    id: maxId + 1,
    content: data.content,
    important: typeof data.important !== 'undefined' ? data.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, note]
  res.status(201).send({ note })
})

app.get('/api/notes', (req, res) => {
  res.status(200).send({ notes })
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(note => note.id === Number(id))
  if (note) {
    res.status(200).send({ note })
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== Number(id))
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).send('<h1>Not found 404</h1>')
})

app.listen(config.PORT, () => {
  console.log(`On listen port ${config.PORT}`)
})
