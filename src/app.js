import Express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app = Express()

app.use(cors())
app.use(cookieParser())

app.get('',(req,res)=>res.send("Welcome to the demo backend"))