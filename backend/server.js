import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
const port=process.env.PORT;

connectDb();

//Body parser middleware
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.get('/', async(req, res) => {
    res.send("Helloo")
})

app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(port, ()=>{
    console.log("Server is running on port: ",port);
})