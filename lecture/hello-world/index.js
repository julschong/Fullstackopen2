const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
]

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response) => {
  response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
  const note = notes.find((note) => Number(request.params.id) === note.id)

  note ? response.json(note) : response.status(404).end()
})

app.delete("/api/notes/:id", (request, response) => {
  if (notes.some((note) => note.id === Number(request.params.id))) {
    notes = notes.filter((note) => Number(request.params.id) !== note.id)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post("/api/notes", (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
