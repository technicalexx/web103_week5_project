import express from "express"
// import path from 'path'
// import favicon from 'serve-favicon'
import dotenv from "dotenv"

import cors from "cors"

// import the router from your routes file
import customItemsRouter from "./routes/customItems.js"

dotenv.config()

// const PORT = process.env.PORT || 3002

const app = express()

app.use(cors())
app.use(express.json())

// if (process.env.NODE_ENV === 'development') {
//     app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
// }
// else if (process.env.NODE_ENV === 'production') {
//     app.use(favicon(path.resolve('public', 'lightning.png')))
//     app.use(express.static('public'))
// }

// specify the api path for the server to use

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`)
  next()
})

app.get("/test", (req, res) => {
  res.send("server works")
})

app.use("/api/customitems", customItemsRouter)

const PORT = process.env.PORT || 3002

// if (process.env.NODE_ENV === 'production') {
//     app.get('/*', (_, res) =>
//         res.sendFile(path.resolve('public', 'index.html'))
//     )
// }

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
