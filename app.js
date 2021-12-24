const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const HOST = '192.168.0.37'
const { join } = require('path')

app.use(express.static('public'))

app.get('/', async (req, res) => {
  try {
    return res.sendFile(join(process.cwd(), 'src', 'html', 'home.html'))
  } catch (error) {
    console.log(error)
  }
})

// login
app.get('/user/login', async (req, res) => {
  try {
    return res.sendFile(join(process.cwd(), 'src', 'html', 'login.html'))
  } catch (error) {
    console.log(error)
  }
})

// register
app.get('/user/register', async (req, res) => {
  try {
    return res.sendFile(join(process.cwd(), 'src', 'html', 'register.html'))
  } catch (error) {
    console.log(error)
  }
})

// userTodo
app.get('/user/todo', async (req, res) => {
  try {
    return res.sendFile(join(process.cwd(), 'src', 'html', 'todo.html'))
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () =>
  console.log(`Client server is running... http://${HOST}:${PORT}`)
)
