import cors from "cors"
import "dotenv/config"
import express from "express"
import connectDB from "./configs/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoutes.js"

const PORT = process.env.PORT || 4000
const app = express();
await connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req, res) => res.send("Welcome! Everything's working as expected on the backend."))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
